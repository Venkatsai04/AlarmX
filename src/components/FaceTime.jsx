import React, { useEffect, useRef, useState } from "react";

const FaceTime = () => {
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    // Ask camera permission on load
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setIsVideoReady(true);
            console.log("✅ Camera ready");
          };
        }
      } catch (err) {
        console.error("❌ Camera access error:", err);
      }
    };

    startCamera();
  }, []);

  const handleVerify = async () => {
    console.log("🟢 Verify button clicked");

    const video = videoRef.current;
    if (!video || video.videoWidth === 0) {
      alert("Video not ready yet!");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const blob = await new Promise(resolve =>
      canvas.toBlob(resolve, "image/jpeg", 0.95)
    );

    const formData = new FormData();
    formData.append("image", blob, "snapshot.jpg");
    formData.append("analysisType", "sleepiness"); // ✅ IMPORTANT LINE

    try {
      const response = await fetch("http://localhost:3000/upload-and-analyze", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("✅ Verification result:", result);

      if (result.success) {
        console.log("User is awake enough: ", result);
        // Optionally stop alarm or give pass
      } else {
        console.warn("Verification failed: ", result.message);
        // 🔊 Do not stop alarm
      }
    } catch (error) {
      console.error("❌ Verification error:", error);
    }
  };



  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-xl font-bold mb-4">Face Verification</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-64 h-48 border border-gray-400 rounded"
      />

      <button
        onClick={handleVerify}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        disabled={!isVideoReady}
      >
        Verify Face
      </button>
    </div>
  );
};

export default FaceTime;
