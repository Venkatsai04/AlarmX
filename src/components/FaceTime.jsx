import React, { useEffect, useRef, useState } from "react";

const FaceTime = ({ stopAlarm }) => {
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
    formData.append("image", blob, "captured_image.jpeg");
    formData.append("type", "sleepiness");

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/upload-and-analyze", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("✅ Verification result:", result);

      if (result.success) {
        if (result.sleepiness > 60 && result.sleepy) {
          setIsVerified(true);
        } else {
          alert("You don't look sleepy enough! 😅");
        }
      } else {
        console.warn("Verification failed: ", result.message);
        alert("Verification failed.");
      }
    } catch (error) {
      console.error("❌ Verification error:", error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isVerified) {
      console.log("✅ Face Verified");
      stopAlarm();
    }
  }, [isVerified]);

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-xl font-bold mb-4">Face Verification</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-64 h-48 border border-gray-400 rounded"
      />

      {!isVerified ? (
        <button
          onClick={handleVerify}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={!isVideoReady || isLoading}
        >
          {isLoading ? "Verifying..." : "Verify Face"}
        </button>
      ) : (
        <div className="mt-4 text-green-600 font-bold text-lg">Good morning 😄</div>
      )}
    </div>
  );
};

export default FaceTime;
