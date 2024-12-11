import React, { useEffect, useState } from 'react';
import { Megaphone, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzGg2HhLLgNIPrlvrxSEACspMpygoH4g-KfUWG0pmHw1RgjBjrHkaj7YQ6vnU2i1bBQkA/exec';
const UPDATE_INTERVAL = 10 * 60 * 60 * 1000; // 10 hours in milliseconds

export const Announcements: React.FC<{ isGray: boolean }> = ({ isGray }) => {
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    try {
      setRefreshing(true);
      setError(null);
      const response = await fetch(SHEET_URL);
      if (!response.ok) throw new Error('فشل في جلب الإعلانات');
      const data = await response.json();
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
      setError('حدث خطأ أثناء تحميل الإعلانات');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    const interval = setInterval(fetchAnnouncements, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={isGray ? 'bg-gray-100/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 border-gray-800/30' : 'bg-amber-50/95 backdrop-blur-sm rounded-lg shadow-lg border border-amber-100 border-amber-800/30'}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={isGray ? 'bg-gray-200 p-2 rounded-full' : 'bg-amber-100 p-2 rounded-full'}>
              <Megaphone className={isGray ? 'w-5 h-5 text-gray-700' : 'w-5 h-5 text-amber-700'} />
            </div>
            <h2 className={isGray ? 'text-lg font-medium text-gray-900' : 'text-lg font-medium text-amber-900'}>إعلانات الحلقة</h2>
          </div>
          <button
            onClick={fetchAnnouncements}
            disabled={refreshing}
            className={isGray ? 'text-sm text-gray-700 hover:text-gray-800 flex items-center gap-1' : 'text-sm text-amber-700 hover:text-amber-800 flex items-center gap-1'}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'جاري التحديث' : 'تحديث'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={isGray ? 'h-12 bg-gray-200 rounded animate-pulse' : 'h-12 bg-amber-100 rounded animate-pulse'}
                />
              ))}
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-4"
            >
              <p className="text-red-500 text-sm">{error}</p>
              <button
                onClick={fetchAnnouncements}
                className={isGray ? 'mt-2 text-sm text-gray-700 hover:text-gray-800' : 'mt-2 text-sm text-amber-700 hover:text-amber-800'}
              >
                إعادة المحاولة
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {announcements.length === 0 ? (
                <div className={isGray ? 'text-center py-4 text-gray-700 text-sm' : 'text-center py-4 text-amber-700 text-sm'}>
                  لا توجد إعلانات حالياً
                </div>
              ) : (
                announcements.map((announcement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={isGray ? 'p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-700/20' : 'p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors border border-amber-700/20'}
                  >
                    <p className={isGray ? 'text-gray-800 text-sm leading-relaxed' : 'text-amber-800 text-sm leading-relaxed'}>{announcement}</p>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};