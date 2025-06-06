// 2. Updated ChapterCard component with fixed theme colors
'use client';

import { Chapter } from '@/types/chapter';
import { getIconForChapter } from '@/utils/iconMapping';
import { getTotalQuestions } from '@/utils/filterHelpers';

interface ChapterCardProps {
  chapter: Chapter;
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const IconComponent = getIconForChapter(chapter.chapter);
  const current2025 = chapter.yearWiseQuestionCount['2025'] || 0;
  const previous2024 = chapter.yearWiseQuestionCount['2024'] || 0;
  const totalQuestions = getTotalQuestions(chapter);

  const getTrendIcon = () => {
    if (current2025 > previous2024) {
      return <span className="text-green-400 text-sm">↑</span>;
    } else if (current2025 < previous2024) {
      return <span className="text-red-400 text-sm">↓</span>;
    }
    return null;
  };

  return (
    <div className="p-3 sm:p-4 bg-white dark:bg-[#2D3748] border border-gray-200 dark:border-gray-600 rounded-xl hover:border-gray-300 dark:hover:border-gray-500 transition-colors shadow-sm">

      {/* Mobile Layout: Stacked */}
      <div className="flex flex-col gap-3 sm:hidden">
        {/* Top: Icon and Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-lg flex-shrink-0">
            <IconComponent size={16} className="text-gray-600 dark:text-gray-300" />
          </div>
          <h2 className="font-inter font-semibold text-sm leading-5 tracking-normal text-black dark:text-white flex-1 min-w-0">
            {chapter.chapter}
          </h2>
        </div>

        {/* Bottom: Stats */}
        <div className="flex items-center justify-end gap-2 text-xs font-medium text-black dark:text-white">
          <div className="flex items-center gap-1">
            <span className="text-gray-500 dark:text-gray-400">2025:</span>
            <span>{current2025}Qs</span>
            {getTrendIcon()}
          </div>
          <span className="text-gray-400 dark:text-gray-500">|</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-500 dark:text-gray-400">2024:</span>
            <span>{previous2024}Qs</span>
          </div>
          <span className="text-gray-400 dark:text-gray-500">|</span>
          <div className="flex items-center gap-1">
            <span>{totalQuestions}Qs</span>
          </div>
        </div>
      </div>

      {/* Desktop Layout: Side by side */}
      <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-4">
        {/* Left: Icon and Title */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-lg flex-shrink-0">
            <IconComponent size={20} className="text-gray-600 dark:text-gray-300" />
          </div>
          <div className="flex-1 min-w-0">
              <h2 className="font-inter font-semibold text-base leading-6 tracking-normal text-black dark:text-white truncate">
                {chapter.chapter}
              </h2>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="flex items-center justify-end gap-1 text-sm font-medium text-black dark:text-white tracking-[0] flex-shrink-0">
          <div className="flex items-center gap-0.5">
            <span className="text-gray-500 dark:text-gray-400">2025:</span>
            <span>{current2025}Qs</span>
            {getTrendIcon()}
          </div>
          <span className="text-gray-400 dark:text-gray-500">|</span>
          <div className="flex items-center gap-0.5">
            <span className="text-gray-500 dark:text-gray-400">2024:</span>
            <span>{previous2024}Qs</span>
          </div>
           <span className="text-gray-400 dark:text-gray-500">|</span>
          <div className="flex items-center gap-0.5">
            <span>{totalQuestions}Qs</span>
          </div>
        </div>
      </div>
    </div>
  );
}