import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface RulesProps {
  isGray: boolean;
  onClose: () => void;
}

export function Rules({ isGray, onClose }: RulesProps) {
  const rules = [
    {
      name: 'التسميع والمراجعة المنتظمة',
      points: 15
    },
    {
      name: 'الانضباط والحضور المبكر',
      points: 5
    },
    {
      name: 'احترام المعلم والمحافظة على النظام',
      points: 5
    }
  ];

  return (
    <>
      {/* Overlay Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className={`w-full max-w-md relative ${
            isGray ? 'bg-white/95' : 'bg-amber-50/95'
          } backdrop-blur-sm rounded-lg shadow-lg`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
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

          <table className="w-full">
            <thead>
              <tr className={isGray ? 'bg-gray-100' : 'bg-amber-100'}>
                <th className="px-6 py-3 text-right text-lg font-semibold">البند</th>
                <th className="px-6 py-3 text-center text-lg font-semibold">النقاط</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule, index) => (
                <tr key={index} className={`${
                  isGray 
                    ? index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    : index % 2 === 0 ? 'bg-amber-50/50' : 'bg-amber-50'
                }`}>
                  <td className="px-6 py-4 text-right">{rule.name}</td>
                  <td className="px-6 py-4 text-center">{rule.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
}
