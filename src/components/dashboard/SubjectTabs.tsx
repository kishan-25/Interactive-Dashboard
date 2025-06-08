'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Atom, Flask, MathOperations } from '@phosphor-icons/react';
import { Moon, Sun } from 'phosphor-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function SubjectTabs() {
  const selectedSubject = useSelector((state: RootState) => state.filters.selectedSubject);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const subjectDetails: Record<string, { label: string; icon: React.ElementType; bgColor: string }> = {
    Physics: {
      label: 'Physics PYQs',
      icon: Atom,
      bgColor: 'bg-orange-500',
    },
    Chemistry: {
      label: 'Chemistry PYQs',
      icon: Flask,
      bgColor: 'bg-green-500',
    },
    Mathematics: {
      label: 'Mathematics PYQs',
      icon: MathOperations,
      bgColor: 'bg-blue-500',
    },
  };

  const subject = subjectDetails[selectedSubject];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <div className="relative flex justify-center items-center px-3 py-4 border-b border-gray-200 dark:border-gray-600 sm:px-4 sm:py-6 bg-white dark:bg-[#2D3748]">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-1 sm:mb-2">
            <div className={`w-5 h-5 sm:w-6 sm:h-6 ${subject.bgColor} rounded-md flex items-center justify-center text-white`}>
              <subject.icon size={12} weight="bold" className="sm:w-[14px] sm:h-[14px]" />
            </div>
            <h1 className="text-base sm:text-lg font-semibold text-black dark:text-white">{subject.label}</h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Chapter-wise Collection of {subject.label}
          </p>
        </div>
        <div className="absolute right-3 top-4 sm:right-4 sm:top-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2D3748]" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center px-3 py-4 border-b border-gray-200 dark:border-gray-600 sm:px-4 sm:py-6 bg-white dark:bg-[#2D3748]">
      {/* Subject Info - Centered */}
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-1 sm:mb-2">
          <div className={`w-5 h-5 sm:w-6 sm:h-6 ${subject.bgColor} rounded-md flex items-center justify-center text-white`}>
            <subject.icon size={12} weight="bold" className="sm:w-[14px] sm:h-[14px]" />
          </div>
          <h1 className="text-base sm:text-lg font-semibold text-black dark:text-white">{subject.label}</h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          Chapter-wise Collection of {subject.label}
        </p>
      </div>

      {/* Theme Toggle - Absolute positioned */}
      <div className="absolute right-3 top-4 sm:right-4 sm:top-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="w-8 h-8 sm:w-10 sm:h-10 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2D3748] text-black dark:text-white"
        >
          {theme === 'light' ? (
            <Moon size={16} className="sm:w-5 sm:h-5" />
          ) : (
            <Sun size={16} className="sm:w-5 sm:h-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
