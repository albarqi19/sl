import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Search } from 'lucide-react';

interface QRScannerProps {
  onScan: (studentId: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);

  useEffect(() => {
    if (isScanning && !scanner) {
      const html5QrCode = new Html5Qrcode("reader");
      setScanner(html5QrCode);

      html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          html5QrCode.stop();
          setIsScanning(false);
          onScan(decodedText);
        },
        (error) => {
          console.error(error);
        }
      ).catch((err) => {
        console.error(err);
      });
    }

    return () => {
      if (scanner) {
        scanner.stop().catch(console.error);
      }
    };
  }, [isScanning, scanner, onScan]);

  const handleStartScan = () => {
    setIsScanning(true);
  };

  const handleStopScan = () => {
    if (scanner) {
      scanner.stop().catch(console.error);
      setScanner(null);
    }
    setIsScanning(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {isScanning ? (
        <div className="relative rounded-lg overflow-hidden bg-white p-4">
          <div id="reader" className="w-full"></div>
          <button
            onClick={handleStopScan}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
          >
            إغلاق
          </button>
        </div>
      ) : (
        <button
          onClick={handleStartScan}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Search className="w-6 h-6" />
          مسح رمز QR
        </button>
      )}
    </div>
  );
};