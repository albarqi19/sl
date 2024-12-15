import React, { useState } from 'react';
import { StudentSearch } from './components/StudentSearch';
import { StudentCard } from './components/StudentCard';
import { Announcements } from './components/Announcements';
import { FeaturedStudents } from './components/FeaturedStudents';
import { Search, Sun, Moon, Trophy, Medal, ListChecks } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import type { Student } from './types';
import logoImage from './assets/logo.png';
import { AppTitle } from './components/AppTitle';
import { Footer } from './components/Footer';
import { Levels } from './components/Levels';

export default function App() {
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGray, setIsGray] = useState(true);
  const [showLevels, setShowLevels] = useState(false);

  const handleSearch = async (studentId: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbyNhqdQmZJ6pfsbYEN0Z4hPM94mqt4Js2ZB7RcgQGlfnG-j_oILo69nFpuGXs5dlunT5Q/exec?studentId=${studentId}`
      );
      const data = await response.json();

      if (data.message) {
        toast.error('لم يتم العثور على الطالب', {
          icon: '❌',
          duration: 3000,
        });
        return;
      }

      setStudentData({
        ...data,
        level: data.parts,
        className: data.level,
        class: data.class
      });

      toast.success('تم العثور على بيانات الطالب!', {
        icon: '🌟',
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error('حدث خطأ أثناء البحث', {
        icon: '❌',
        duration: 3000,
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setStudentData(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const toggleColor = () => {
    setIsGray(!isGray);
  };

  return (
    <div className={isGray ? 'min-h-screen bg-gray-200 text-gray-800' : 'min-h-screen bg-gradient-to-b from-amber-50 to-white text-brown-800'}>
      <div className="max-w-3xl mx-auto px-4 py-0 pb-0">
        {/* زر تغيير اللون في الزاوية العلوية */}
        <div className="absolute top-4 left-4">
          <div
            onClick={toggleColor}
            className={`cursor-pointer relative w-8 h-8 flex items-center justify-center ${isGray ? 'bg-gray-800' : 'bg-amber-100'} rounded-full transition-all duration-300 ease-in-out shadow-lg overflow-hidden`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {isGray ? <Moon className="w-4 h-4 text-gray-200" /> : <Sun className="w-4 h-4 text-amber-600" />}
            </div>
          </div>
        </div>
        {!studentData ? (
          <>
            <div className="flex justify-center">
              <img 
                src={logoImage} 
                alt="شعار المسجد" 
                className={isGray ? "w-[600px] h-[300px] object-contain grayscale" : "w-[600px] h-[300px] object-contain"}
              />
            </div>
            <Announcements isGray={isGray} />
            <FeaturedStudents />
            <div className="mt-8">
              <StudentSearch onSearch={handleSearch} isSearching={isSearching} autoFocus isGray={isGray} />
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => setShowLevels(!showLevels)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                    isGray
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  <Trophy className="w-5 h-5" />
                  المستويات
                </button>
                <button
                  disabled
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors opacity-70 cursor-not-allowed ${
                    isGray
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  <Medal className="w-5 h-5" />
                  الأعلى نقاطاً
                  <span className="text-xs">(قريباً)</span>
                </button>
                <button
                  disabled
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors opacity-70 cursor-not-allowed ${
                    isGray
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  <ListChecks className="w-5 h-5" />
                  البنود
                  <span className="text-xs">(قريباً)</span>
                </button>
              </div>
              {showLevels && <div className="mt-4"><Levels isGray={isGray} /></div>}
              <AppTitle isGray={isGray} />
              <Footer isGray={isGray} />
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <img 
                src={logoImage} 
                alt="شعار المسجد" 
                className={isGray ? "w-[600px] h-[300px] object-contain grayscale" : "w-[600px] h-[300px] object-contain"}
              />
            </div>
            <StudentCard
              student={studentData}
              onReset={handleReset}
              onSearch={handleSearch}
              isSearching={isSearching}
            />
            <AppTitle isGray={isGray} />
            <Footer isGray={isGray} />
          </>
        )}
      </div>

      {isSearching && (
        <div className={isGray ? "fixed inset-0 bg-gray-200/60 backdrop-blur-sm flex items-center justify-center z-50" : "fixed inset-0 bg-amber-50/60 backdrop-blur-sm flex items-center justify-center z-50"}>
          <div className="text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto">
              <Search 
                className={isGray ? "w-20 h-20 text-gray-700" : "w-20 h-20 text-amber-700"} 
                style={{ 
                  filter: 'drop-shadow(0 0 8px rgba(180, 83, 9, 0.5))',
                  animation: 'searchWave 1.5s ease-in-out infinite'
                }} 
              />
            </div>
            <div className="space-y-2">
              <p className={isGray ? "text-2xl font-medium text-gray-900" : "text-2xl font-medium text-amber-900"}>جاري البحث</p>
              <p className={isGray ? "text-sm text-gray-700" : "text-sm text-amber-700"}>يرجى الانتظار...</p>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
}