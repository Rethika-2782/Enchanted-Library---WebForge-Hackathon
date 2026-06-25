import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Check, Camera, X, Scan } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function QRCheckIn() {
  const [deskCode, setDeskCode] = useState('');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setIsScanning(false);
  }, []);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      setIsScanning(true);
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions or enter desk code manually.');
      setCameraActive(false);
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Simulated QR code detection
  useEffect(() => {
    if (isScanning && cameraActive) {
      const timer = setTimeout(() => {
        // Simulate finding a QR code
        const simulatedDeskId = `${String.fromCharCode(65 + Math.floor(Math.random() * 3))}-${Math.floor(Math.random() * 15) + 1}`;
        setDeskCode(simulatedDeskId);
        handleSuccessfulCheckIn(simulatedDeskId);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isScanning, cameraActive]);

  const handleSuccessfulCheckIn = (deskId: string) => {
    stopCamera();
    setIsCheckedIn(true);
    setDeskCode(deskId);
    setTimeout(() => {
      setIsCheckedIn(false);
      setDeskCode('');
    }, 5000);
  };

  const handleManualCheckIn = () => {
    if (deskCode) {
      handleSuccessfulCheckIn(deskCode);
    }
  };

  const handleToggleScanner = () => {
    if (isScanning) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="text-center">
        <h1 className="text-3xl font-serif text-[#D4AF37]">QR Check-In</h1>
        <p className="text-[#EAD7B7]/60 mt-1">Scan the desk QR code or enter the desk ID</p>
      </div>

      <Card className="bg-[#2a2018] border-[#8B5E3C]/30">
        <CardHeader>
          <CardTitle className="text-[#D4AF37] text-center flex items-center justify-center gap-2">
            <Scan className="w-5 h-5" />
            Magical Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative aspect-square max-w-sm mx-auto bg-[#1B1612] rounded-lg border-2 border-[#8B5E3C] flex items-center justify-center overflow-hidden">
            {isCheckedIn ? (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center p-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border-2 border-green-500"
                >
                  <Check className="w-12 h-12 text-green-400" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-green-400 font-semibold text-lg"
                >
                  Successfully Checked In!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-[#EAD7B7]/60 mt-1"
                >
                  Desk {deskCode}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 text-sm text-[#D4AF37]"
                >
                  +10 House Points Earned!
                </motion.div>
              </motion.div>
            ) : cameraActive ? (
              <>
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  muted
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Scanning overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Corner brackets */}
                  <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-[#D4AF37] rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-16 h-16 border-r-4 border-t-4 border-[#D4AF37] rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-l-4 border-b-4 border-[#D4AF37] rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-[#D4AF37] rounded-br-lg" />
                  
                  {/* Scanning line */}
                  <motion.div
                    className="absolute left-8 right-8 h-1 bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50"
                    animate={{ top: ['16px', 'calc(100% - 16px)', '16px'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
                
                {/* Instructions */}
                <div className="absolute bottom-8 left-4 right-4 text-center">
                  <p className="text-[#D4AF37] text-sm font-medium bg-[#1B1612]/80 px-3 py-2 rounded-lg inline-block">
                    Align QR code within the frame
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <QrCode className="w-20 h-20 text-[#8B5E3C] mx-auto mb-4" />
                </motion.div>
                <p className="text-[#EAD7B7]/60">Click below to activate camera scanner</p>
              </div>
            )}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm flex items-start gap-2"
            >
              <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <Button
            onClick={handleToggleScanner}
            disabled={isCheckedIn}
            className={`w-full py-6 text-lg font-semibold ${
              isScanning 
                ? 'bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30' 
                : 'bg-[#8B5E3C] hover:bg-[#7a5035] text-[#F5E9D3]'
            }`}
          >
            <Camera className="w-5 h-5 mr-2" />
            {isScanning ? 'Stop Scanner' : 'Start Camera Scanner'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#8B5E3C]/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#2a2018] text-[#EAD7B7]/60">or enter code manually</span>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              placeholder="Enter desk code (e.g., A-12)"
              value={deskCode}
              onChange={(e) => setDeskCode(e.currentTarget.value.toUpperCase())}
              disabled={isCheckedIn}
              className="bg-[#1B1612] border-[#8B5E3C] text-[#F5E9D3] text-center text-lg font-mono tracking-wider"
            />
            <Button
              onClick={handleManualCheckIn}
              disabled={!deskCode || isCheckedIn}
              className="w-full bg-[#D4AF37] hover:bg-[#c9a030] text-[#1B1612] font-semibold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-5 h-5 mr-2" />
              Check In to Desk {deskCode || '...'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}