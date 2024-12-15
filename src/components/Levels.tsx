import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { LEVELS, POINTS_PER_LEVEL } from '../utils/levels';

interface LevelsProps {
  isGray: boolean;
}

export const Levels: React.FC<LevelsProps> = ({ isGray }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`max-w-md mx-auto ${
        isGray
          ? 'bg-gray-100/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200'
          : 'bg-amber-50/95 backdrop-blur-sm rounded-lg shadow-lg border border-amber-100'
      } p-4`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={isGray ? 'bg-gray-200 p-2 rounded-full' : 'bg-amber-100 p-2 rounded-full'}>
            <Trophy className={isGray ? 'w-5 h-5 text-gray-700' : 'w-5 h-5 text-amber-700'} />
          </div>
          <h2 className={isGray ? 'text-lg font-medium text-gray-900' : 'text-lg font-medium text-amber-900'}>
            المستويات والنقاط
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-opacity-20">
        <table className="min-w-full divide-y divide-opacity-20">
          <thead className={isGray ? 'bg-gray-200' : 'bg-amber-100'}>
            <tr>
              <th
                scope="col"
                className={`px-4 py-3 text-right text-sm font-semibold ${
                  isGray ? 'text-gray-900' : 'text-amber-900'
                }`}
              >
                المستوى
              </th>
              <th
                scope="col"
                className={`px-4 py-3 text-right text-sm font-semibold ${
                  isGray ? 'text-gray-900' : 'text-amber-900'
                }`}
              >
                النقاط المطلوبة
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-opacity-20">
            {LEVELS.map((level, index) => (
              <tr
                key={level}
                className={`${
                  isGray
                    ? 'bg-white even:bg-gray-50 hover:bg-gray-100'
                    : 'bg-white even:bg-amber-50 hover:bg-amber-100'
                } transition-colors`}
              >
                <td
                  className={`px-4 py-3 text-sm ${
                    isGray ? 'text-gray-900' : 'text-amber-900'
                  } font-medium`}
                >
                  {level}
                </td>
                <td
                  className={`px-4 py-3 text-sm ${isGray ? 'text-gray-600' : 'text-amber-600'}`}
                >
                  {POINTS_PER_LEVEL[level]} نقطة
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
