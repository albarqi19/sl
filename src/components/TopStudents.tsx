import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Trophy, X, Medal, Crown } from 'lucide-react';

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

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-amber-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-blue-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-emerald-600" />;
      default:
        return null;
    }
  };

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-amber-50 border-amber-200';
      case 1:
        return 'bg-blue-50 border-blue-200';
      case 2:
        return 'bg-emerald-50 border-emerald-200';
      default:
        return isGray 
          ? index % 2 === 0 ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100'
          : index % 2 === 0 ? 'bg-amber-50/30 border-amber-100' : 'bg-white border-amber-50';
    }
  };

  const getRankNumberStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-amber-500 text-white';
      case 1:
        return 'bg-blue-500 text-white';
      case 2:
        return 'bg-emerald-600 text-white';
      default:
        return isGray 
          ? 'bg-gray-500 text-white'
          : 'bg-amber-500/50 text-amber-900';
    }
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={handleClose}
          />
          
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
              } backdrop-blur-sm rounded-lg shadow-lg overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* الرأس الثابت */}
              <div className={`sticky top-0 z-10 ${
                isGray ? 'bg-white' : 'bg-amber-50'
              } border-b ${
                isGray ? 'border-gray-200' : 'border-amber-200'
              }`}>
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

                <div className="pt-6 pb-4">
                  <h2 className={`text-xl font-bold flex items-center justify-center gap-2 ${
                    isGray ? 'text-gray-800' : 'text-amber-800'
                  }`}>
                    <Trophy className="w-6 h-6" />
                    <span>الأعلى نقاطاً على مستوى الحلقات</span>
                    <Trophy className="w-6 h-6" />
                  </h2>
                </div>
              </div>

              {/* محتوى قابل للتمرير */}
              {loading ? (
                <div className="p-8 text-center">جاري التحميل...</div>
              ) : (
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                  <div className="p-4 space-y-3">
                    {topStudents.map((student, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${getRankStyle(index)} transition-all hover:shadow-md relative`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getRankNumberStyle(index)}`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-bold text-lg">{student.name}</div>
                              <div className="text-sm text-gray-600 mt-1">
                                النقاط: {student.points} | الحلقة: {student.level}
                              </div>
                            </div>
                          </div>
                          <div className="pl-4">
                            {getRankIcon(index)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};
