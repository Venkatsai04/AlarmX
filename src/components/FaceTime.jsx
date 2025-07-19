// FaceSleepVerifier.jsx
import React, { useRef, useState } from 'react';

const FaceSleepVerifier = ({ onVerified, threshold = 30 }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    setError('');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Camera access denied.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      setPreviewURL(URL.createObjectURL(blob));
      analyzePhoto(blob);
      stopCamera();
    }, 'image/jpeg', 0.95);
  };

  const analyzePhoto = async (blob) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('image', blob, 'capture.jpg');
      formData.append('type', 'sleepiness');

      const res = await fetch('http://localhost:3000/upload-and-analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data?.success && data.result) {
        setResult(data.result);
        if (data.result.sleepiness <= threshold) {
          onVerified(); // STOP ALARM HERE
        }
      } else {
        setError(data?.message || 'Invalid response');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Sleepiness Verification</h2>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      {!stream && (
        <button onClick={startCamera} className="button-secondary w-full mb-4">
          Start Camera
        </button>
      )}

      {stream && (
        <>
          <video ref={videoRef} autoPlay playsInline className="rounded-lg shadow-md w-full mb-4" />
          <button onClick={takePhoto} className="button-primary w-full mb-4">
            Take Photo & Analyze
          </button>
        </>
      )}

      {previewURL && (
        <img src={previewURL} alt="Preview" className="rounded-lg shadow-md w-full mb-4" />
      )}

      {loading && <p className="text-blue-600 text-center">Analyzing...</p>}

      {result && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p>
            <strong>Sleepy:</strong> {result.sleepy ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Sleepiness:</strong> {result.sleepiness} / 100
          </p>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default FaceSleepVerifier;
