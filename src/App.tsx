import React, { useState } from 'react';
import { StudentSearch } from './components/StudentSearch';
import { StudentCard } from './components/StudentCard';
import { Announcements } from './components/Announcements';
import { FeaturedStudents } from './components/FeaturedStudents';
import { Search } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import type { Student } from './types';
import logoImage from './assets/logo.png';
import { AppTitle } from './components/AppTitle';
import { Footer } from './components/Footer';

export default function App() {
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {!studentData ? (
          <>
            <div className="flex justify-center">
              <img 
                src={logoImage} 
                alt="شعار المسجد" 
                className="w-[600px] h-[300px] object-contain"
              />
            </div>

            <div className="space-y-2">
              <Announcements />
              <FeaturedStudents />
              <StudentSearch onSearch={handleSearch} isSearching={isSearching} autoFocus />
              <AppTitle />
              <Footer />
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <img 
                src={logoImage} 
                alt="شعار المسجد" 
                className="w-[600px] h-[300px] object-contain"
              />
            </div>
            <StudentCard
              student={studentData}
              onReset={handleReset}
              onSearch={handleSearch}
              isSearching={isSearching}
            />
            <AppTitle />
            <Footer />
          </>
        )}
      </div>

      {isSearching && (
        <div className="fixed inset-0 bg-amber-50/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto">
              <Search 
                className="w-20 h-20 text-amber-700" 
                style={{ 
                  filter: 'drop-shadow(0 0 8px rgba(180, 83, 9, 0.5))',
                  animation: 'searchWave 1.5s ease-in-out infinite'
                }} 
              />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-medium text-amber-900">جاري البحث</p>
              <p className="text-sm text-amber-700">يرجى الانتظار...</p>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
}