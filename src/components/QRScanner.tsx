import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Search } from 'lucide-react';

interface QRScannerProps {
  onScan: (studentId: string) => void;
  isGray: boolean;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, isGray }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isScanning && !scanner) {
      const html5QrCode = new Html5Qrcode("reader");
      setScanner(html5QrCode);

      html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        (decodedText) => {
          html5QrCode.stop().then(() => {
            setIsScanning(false);
            setScanner(null);
            onScan(decodedText);
          }).catch(console.error);
        },
        (errorMessage) => {
          console.warn(`QR Code scanning error: ${errorMessage}`);
        }
      ).catch((err) => {
        console.error('Failed to start scanner:', err);
        setError('فشل في تشغيل الكاميرا. يرجى التحقق من إذن الكاميرا والمحاولة مرة أخرى.');
        setIsScanning(false);
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
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError('')}
          >
            <span className="text-xl">&times;</span>
          </button>
        </div>
      )}
      {isScanning ? (
        <div className={`relative rounded-lg overflow-hidden p-4 ${isGray ? 'bg-gray-100' : 'bg-white'}`}>
          <div id="reader" className="w-full h-[300px]"></div>
          <button
            onClick={handleStopScan}
            className={`absolute top-2 right-2 p-2 rounded-full ${isGray ? 'bg-gray-500 text-gray-100' : 'bg-red-500 text-white'}`}
          >
            إغلاق
          </button>
        </div>
      ) : (
        <button
          onClick={handleStartScan}
          className={`w-full flex items-center justify-center gap-2 p-4 rounded-lg transition-colors ${isGray ? 'bg-gray-600 text-gray-100 hover:bg-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          <Search className="w-6 h-6" />
          مسح رمز QR
        </button>
      )}
    </div>
  );
};