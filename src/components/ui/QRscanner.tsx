'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import jsQR from 'jsqr';


interface QRScannerProps {
  onScanSuccess: (result: string) => void;
  onScanError: (error: string) => void;
}

export default function QRScanner({ onScanSuccess, onScanError }: QRScannerProps) {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    let animationFrameId: number;

    if (cameraActive && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          video.srcObject = stream;
          video.play().catch(err => {
            setCameraError(err.message);
            onScanError(err.message);
            setCameraActive(false);
          });

          const scan = () => {
            if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const code = jsQR(imageData.data, imageData.width, imageData.height);

              if (code) {
                console.log('QR detectado:', code.data);
                onScanSuccess(code.data);
                handleStopCamera();
                return;
              }
            }
            animationFrameId = requestAnimationFrame(scan);
          };

          animationFrameId = requestAnimationFrame(scan);
        })
        .catch(err => {
          setCameraError(err.message);
          onScanError(err.message);
          setCameraActive(false);
        });
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [cameraActive, onScanSuccess, onScanError]);
  
  const handleStartCamera = () => {
    setCameraActive(true);
    setCameraError('');
  };

  const handleStopCamera = () => {
    setCameraActive(false);
    setCameraError('');
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
  };

  const activateCamera = () => {
    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={handleStartCamera} className="w-full max-w-xs">
          Activar Cámara
        </Button>
        {cameraError && <p className="text-red-500 text-sm">{cameraError}</p>}
      </div>
    );
  }

  const qrReader = () => {
    return (
      <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
        <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover" />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <Button
          onClick={handleStopCamera}
          variant="destructive"
          className="absolute top-2 right-2 z-10"
          size="sm"
        >
          Apagar Cámara
        </Button>
      </div>
    );
  }
  
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Escanear QR</h2>
      {!cameraActive ? activateCamera() : qrReader()}
    </div>
  );
}