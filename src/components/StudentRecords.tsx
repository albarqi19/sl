import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, ScrollText } from 'lucide-react';
import toast from 'react-hot-toast';

interface StudentRecord {
  id: string;
  studentId: string;
  studentName: string;
  pages: string;
  reason: string;
  teacher: string;
  dateTime: string;
  date: string;
  studentNumber: string;
  teacherName: string;
  totalPoints: string;
  level: string;
}

interface StudentRecordsProps {
  studentId: string;
  isOpen: boolean;
  onClose: () => void;
  isGray?: boolean;
}

export const StudentRecords: React.FC<StudentRecordsProps> = ({
  studentId,
  isOpen,
  onClose,
  isGray = false,
}) => {
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isOpen && studentId) {
      fetchRecords();
    }
  }, [isOpen, studentId]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.PROD
        ? `/api/student-records/${studentId}`
        : `http://localhost:3000/api/student-records/${studentId}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.error) {
        toast.error('حدث خطأ في جلب السجلات');
        return;
      }

      setRecords(data.records);
    } catch (error) {
      toast.error('حدث خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className={`w-full max-w-4xl relative ${
            isGray ? 'bg-white/95' : 'bg-amber-50/95'
          } backdrop-blur-sm rounded-lg shadow-lg overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`sticky top-0 z-10 ${
            isGray ? 'bg-white border-gray-200' : 'bg-amber-50 border-amber-200'
          } border-b`}>
            <button
              onClick={onClose}
              className={`absolute left-2 top-2 p-1 rounded-full transition-colors ${
                isGray 
                  ? 'hover:bg-gray-200 text-gray-600' 
                  : 'hover:bg-amber-100 text-amber-600'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pt-6 pb-4 text-center">
              <h2 className={`text-xl font-bold flex items-center justify-center gap-2 ${
                isGray ? 'text-gray-800' : 'text-amber-800'
              }`}>
                <ScrollText className="w-6 h-6" />
                <span>سجل النقاط</span>
              </h2>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="p-8 text-center">جاري التحميل...</div>
          ) : records.length === 0 ? (
            <div className="p-8 text-center text-gray-500">لا يوجد سجلات</div>
          ) : (
            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="p-4">
                <div className="space-y-3">
                  {records.map((record, index) => (
                    <motion.div
                      key={record.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-lg border ${
                        isGray 
                          ? 'bg-white border-gray-200' 
                          : 'bg-white/50 border-amber-200'
                      } transition-all hover:shadow-md`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-lg">{record.reason}</div>
                            <div className="text-sm text-gray-600">
                              النقاط المضافة: {record.pages}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {record.date}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <div>المعلم: {record.teacherName}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
