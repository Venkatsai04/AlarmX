import React, { useEffect, useRef, useState } from "react";

const FaceTime = ({ stopAlarm }) => {
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(""); // Renamed for clarity

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setIsVideoReady(true);
            setVerificationStatus("Camera ready. Click 'Verify Face'."); // Initial status
          };
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setVerificationStatus("Camera access denied or error. Please allow camera access."); // Error status
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleVerify = async () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) {
      setVerificationStatus("Video not ready yet! Please wait.");
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
    setVerificationStatus("Verifying your face..."); 

    try {
      const response = await fetch("https://alarmx-backend.vercel.app/upload-and-analyze", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        if (result.result.sleepiness < 50) {
          setIsVerified(true);
          setVerificationStatus("Good morning! You're all set. Alarm stopping...");
         
          setTimeout(() => {
            stopAlarm();
          }, 2000); 
        } else {
          
          setVerificationStatus("You're still sleepy! 😴 Wash your face or try again.");
        }
      } else {
        setVerificationStatus("Verification failed. Please try again.");
      }
    } catch (error) {
      setVerificationStatus("Something went wrong during verification. Please check your server.");
    } finally {
      setIsLoading(false);
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

      <p className="mt-2 text-white-700 text-sm italic">{verificationStatus}</p> {/* Display status here */}

      {!isVerified ? (
        <button
          onClick={handleVerify}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={!isVideoReady || isLoading}
        >
          {isLoading ? "Verifying..." : "Verify Face"}
        </button>
      ) : (
        <div className="mt-4 text-green-600 font-bold text-lg"></div>
      )}
    </div>
  );
};

export default FaceTime;