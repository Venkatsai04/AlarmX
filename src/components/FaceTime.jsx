import React, { useState, useEffect, useRef } from 'react';

const FaceTime = ({ IsMorning, stopAlarm }) => {
  const [verification, setVerification] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Ask for camera permission
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        setHasPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera permission denied:", err);
        setHasPermission(false);
      });

    // Cleanup on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const checkVerification = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setLoading(true);

    // Draw current frame to canvas
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64 image
    const imageBase64 = canvas.toDataURL('image/jpeg');

    try {
      // Send to your sleepiness detection API
      const response = await fetch('https://your-api-url.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageBase64 }),
      });

      const data = await response.json();
      console.log("Sleepiness %:", data.sleepiness);

      if (data.sleepiness < 40) {
        setVerification(true);
        stopAlarm();  // This stops the alarm sound
      } else {
        alert("You look too sleepy! Try again.");
      }

    } catch (err) {
      console.error("Verification failed:", err);
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">
        {IsMorning ? 'Verify you are awake' : 'Stop Alarm'}
      </h2>

      {hasPermission ? (
        <div>
          <video ref={videoRef} autoPlay playsInline width="320" height="240" />
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          <button
            onClick={checkVerification}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          >
            {loading ? 'Verifying...' : 'Verify Face'}
          </button>
        </div>
      ) : (
        <p className="text-red-500">Camera access required</p>
      )}

      {verification && <p className="text-green-600 mt-2">✅ You’re verified!</p>}
    </div>
  );
};

export default FaceTime;
