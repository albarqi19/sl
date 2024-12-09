import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  Award,
  Target,
  Trophy
} from 'lucide-react';
import type { Student } from '../types';
import Confetti from 'react-confetti';

interface StudentCardProps {
  student: Student;
  onReset: () => void;
  onSearch: (studentId: string) => void;
  isSearching: boolean;
}

const getCelebrationConfig = (points: number) => {
  const configs = [
    { points: 0, pieces: 50, gravity: 0.1, duration: 1500 },
    { points: 5, pieces: 75, gravity: 0.1, duration: 1500 },
    { points: 10, pieces: 100, gravity: 0.1, duration: 1500 },
    { points: 20, pieces: 125, gravity: 0.1, duration: 1500 },
    { points: 30, pieces: 150, gravity: 0.1, duration: 1500 },
    { points: 50, pieces: 175, gravity: 0.1, duration: 1500 },
    { points: 100, pieces: 200, gravity: 0.1, duration: 1500 },
    { points: 200, pieces: 225, gravity: 0.1, duration: 1500 },
    { points: 500, pieces: 250, gravity: 0.1, duration: 1500 },
    { points: 1000, pieces: 300, gravity: 0.1, duration: 1500 }
  ];

  const config = configs.reduce((prev, curr) => {
    if (points >= curr.points) return curr;
    return prev;
  }, configs[0]);

  return {
    ...config,
    recycle: false,
    colors: ['#FCD34D', '#F59E0B', '#F97316', '#F43F5E', '#EC4899']
  };
};

export function StudentCard({ student, onReset, onSearch, isSearching }: StudentCardProps) {
  const celebrationConfig = getCelebrationConfig(student.points);

  useEffect(() => {
    const timer = setTimeout(onReset, 10000);
    
    const resetTimer = () => {
      clearTimeout(timer);
      const newTimer = setTimeout(onReset, 10000);
      return () => clearTimeout(newTimer);
    };

    window.addEventListener('click', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('keypress', resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, [onReset]);

  return (
    <div>
      <AnimatePresence>
        {celebrationConfig && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={celebrationConfig.pieces}
            gravity={celebrationConfig.gravity}
            colors={celebrationConfig.colors}
            recycle={celebrationConfig.recycle}
            tweenDuration={celebrationConfig.duration}
            initialVelocityY={{ min: -15, max: -10 }}
            initialVelocityX={{ min: -10, max: 10 }}
            confettiSource={{
              x: window.innerWidth / 2,
              y: window.innerHeight,
              w: 0,
              h: 0
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-[500px] mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 pb-6 space-y-4 border border-amber-100"
      >
        {/* معلومات الطالب الأساسية */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-gray-600 text-sm">الحلقة: {student.className}</p>
        </div>

        {/* النقاط والمستوى */}
        <div className="grid grid-cols-2 gap-3 max-w-[75%] mx-auto">
          <div
            className="relative overflow-hidden rounded-lg p-3 text-center"
            style={{
              background: 'linear-gradient(135deg, #FFB938, #FD7014)',
              boxShadow: '0 4px 15px rgba(253, 112, 20, 0.2)'
            }}
          >
            {/* أيقونة الخلفية */}
            <div className="absolute top-2 left-2 opacity-10">
              <Trophy className="w-16 h-16 text-white" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white/10 px-4 py-1 rounded-full mb-2">
                  <h3 className="text-base font-semibold text-white/90">النقاط</h3>
                </div>
                <p className="text-2xl font-bold text-white">
                  {student.points}
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-lg p-3 text-center"
            style={{
              background: 'linear-gradient(135deg, #22C55E, #059669)',
              boxShadow: '0 4px 15px rgba(34, 197, 94, 0.2)'
            }}
          >
            {/* أيقونة الخلفية */}
            <div className="absolute top-2 left-2 opacity-10">
              <Award className="w-16 h-16 text-white" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white/10 px-4 py-1 rounded-full mb-2">
                  <h3 className="text-base font-semibold text-white/90">المستوى</h3>
                </div>
                <p className="text-2xl font-bold text-white">
                  {student.level}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* المستوى التالي */}
        {student.nextLevel && (
          <div className="max-w-[75%] mx-auto">
            <div className="relative overflow-hidden rounded-lg p-3 text-center bg-gradient-to-br from-sky-500/10 to-blue-600/10 border border-sky-200">
              {/* أيقونة الخلفية */}
              <div className="absolute top-2 left-2 opacity-10">
                <Target className="w-16 h-16 text-sky-600" />
              </div>

              <div className="flex flex-col items-center justify-center space-y-3">
                {/* العنوان */}
                <div className="bg-sky-500/10 px-4 py-1 rounded-full">
                  <h3 className="text-sm font-semibold text-sky-800">المستوى التالي</h3>
                </div>

                {/* المحتوى */}
                <div>
                  <p className="text-2xl font-bold text-sky-600 mb-1">{student.nextLevel}</p>
                  <p className="text-lg text-sky-700/80">
                    باقي {student.pointsNeeded} نقطة للوصول إلى {student.nextLevel}
                  </p>
                </div>

                {/* شريط التقدم */}
                <div className="w-full max-w-[85%] mx-auto">
                  <div className="h-3 bg-sky-100 rounded-full overflow-hidden border border-sky-200">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full shadow-[0_0_5px_rgba(14,165,233,0.3)]"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${Math.min(100, (student.points / (student.points + student.pointsNeeded)) * 100)}%` 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* الملاحظات */}
        {student.violations && student.violations.length > 0 && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-[75%] mx-auto bg-yellow-100 rounded-lg p-4 border border-yellow-200"
          >
            <div className="flex items-center gap-2 text-yellow-700 mb-2">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-medium">الملاحظات</h3>
            </div>
            <ul className="list-disc list-inside text-yellow-700 text-sm space-y-1">
              {student.violations.map((violation, index) => (
                <li key={index}>{violation}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}