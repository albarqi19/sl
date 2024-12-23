import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Trophy, X } from 'lucide-react';

interface TopStudent {
  name: string;
  points: number;
  level: string;
}

interface TopStudentsProps {
  isGray: boolean;
}

export const TopStudents: React.FC<TopStudentsProps> = ({ isGray }) => {
  const [topStudents, setTopStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  const fetchTopStudents = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.PROD 
        ? '/api/top-students'  
        : 'http://localhost:3000/api/top-students';  
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.error) {
        toast.error('حدث خطأ في جلب البيانات');
        return;
      }
      
      setTopStudents(data);
    } catch (error) {
      toast.error('حدث خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setShowList(true);
    fetchTopStudents();
  };

  const handleClose = () => {
    setShowList(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isGray
            ? showList
              ? 'bg-gray-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            : showList
              ? 'bg-amber-600 text-white'
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
        }`}
      >
        <Trophy size={20} />
        <span>الأعلى</span>
      </motion.button>

      {showList && (
        <>
          {/* Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={handleClose}
          />
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <div 
              className={`w-full max-w-md relative ${
                isGray ? 'bg-white/95' : 'bg-amber-50/95'
              } backdrop-blur-sm rounded-lg shadow-lg`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className={`absolute left-2 top-2 p-1 rounded-full transition-colors ${
                  isGray 
                    ? 'hover:bg-gray-200 text-gray-600' 
                    : 'hover:bg-amber-100 text-amber-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              {loading ? (
                <div className="p-8 text-center">جاري التحميل...</div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className={isGray ? 'bg-gray-100' : 'bg-amber-100'}>
                      <th className="px-6 py-3 text-right text-lg font-semibold">الطالب</th>
                      <th className="px-6 py-3 text-center text-lg font-semibold">النقاط</th>
                      <th className="px-6 py-3 text-center text-lg font-semibold">الحلقة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topStudents.map((student, index) => (
                      <tr key={index} className={`${
                        isGray 
                          ? index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          : index % 2 === 0 ? 'bg-amber-50/50' : 'bg-amber-50'
                      }`}>
                        <td className="px-6 py-4 text-right font-medium">{student.name}</td>
                        <td className="px-6 py-4 text-center">{student.points}</td>
                        <td className="px-6 py-4 text-center">{student.level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};
