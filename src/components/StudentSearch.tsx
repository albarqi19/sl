import React, { useState, useEffect } from 'react';
import { QRScanner } from './QRScanner';
import { QrCode } from 'lucide-react';
import { motion } from 'framer-motion';

interface StudentSearchProps {
  onSearch: (studentId: string) => void;
  isSearching: boolean;
  compact?: boolean;
  autoFocus?: boolean;
}

export const StudentSearch: React.FC<StudentSearchProps> = ({
  onSearch,
  isSearching,
  compact = false,
  autoFocus = false,
}) => {
  const [showQR, setShowQR] = useState(false);
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    if (studentId.length === 10) {
      handleManualSubmit();
    }
  }, [studentId]);

  const handleManualSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (studentId.trim()) {
      await onSearch(studentId.trim());
      setStudentId('');
    }
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="بحث سريع برقم الهوية"
            className="w-full px-3 py-2 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 transition-colors text-sm"
            autoFocus={autoFocus}
            maxLength={10}
            disabled={isSearching}
          />
        </form>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {showQR ? (
        <div className="relative">
          <QRScanner onScan={onSearch} />
          <button
            onClick={() => setShowQR(false)}
            className="mt-4 w-full text-amber-700 hover:text-amber-800 transition-colors"
            disabled={isSearching}
          >
            العودة للإدخال اليدوي
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <form onSubmit={handleManualSubmit}>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="أدخل رقم هوية الطالب"
              className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 transition-colors"
              autoFocus={autoFocus}
              maxLength={10}
              disabled={isSearching}
            />
          </form>

          <button
            onClick={() => setShowQR(true)}
            className="w-full flex items-center justify-center gap-2 bg-amber-50 text-amber-700 p-4 rounded-lg hover:bg-amber-100 transition-colors"
            disabled={isSearching}
          >
            <QrCode className="w-6 h-6" />
            مسح رمز QR
          </button>
        </div>
      )}
    </div>
  );
};