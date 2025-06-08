'use client';

import { useState } from 'react';
import { useChapters } from '@/hooks/useChapters';
import { ChapterCard } from './ChapterCard';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSortOrder } from '@/store/slices/filtersSlice';

const ITEMS_PER_PAGE = 10;

export function ChapterList() {
  const dispatch = useDispatch();
  const { filteredChapters } = useChapters();
  const sortOrder = useSelector((state: RootState) => state.filters.sortOrder);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = () => {
    dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(1); // Reset on sort
  };

  const sortedChapters = [...filteredChapters].sort((a, b) => {
    const aTotal = Object.values(a.yearWiseQuestionCount).reduce((sum, val) => sum + val, 0);
    const bTotal = Object.values(b.yearWiseQuestionCount).reduce((sum, val) => sum + val, 0);
    return sortOrder === 'asc' ? aTotal - bTotal : bTotal - aTotal;
  });

  const totalPages = Math.ceil(sortedChapters.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentChapters = sortedChapters.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  return (
    <div className="px-3 pb-6 sm:px-4 bg-gray-50 dark:bg-[#1A202C] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 pt-4">
        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Showing all chapters ({filteredChapters.length})
        </span>

        <Button 
          variant="ghost"
          size="sm"
          onClick={handleSort}
          className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 h-7 px-2 sm:h-8 sm:px-3"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path
              d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden xs:inline">Sort</span>
        </Button>
      </div>

      {/* Chapter Cards */}
      <div className="space-y-2 sm:space-y-3">
        {currentChapters.map((chapter, index) => (
          <ChapterCard
            key={`${chapter.subject}-${chapter.chapter}-${startIndex + index}`}
            chapter={chapter}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-3 mt-6">
          {/* Mobile-first pagination controls */}
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-xs bg-white dark:bg-[#2D3748] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden xs:ml-1 xs:inline">Prev</span>
            </Button>

            {/* Page numbers - responsive visibility */}
            <div className="flex gap-1">
              {getVisiblePages().map((page, idx) => (
                <div key={idx}>
                  {page === '...' ? (
                    <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 text-xs text-gray-500 dark:text-gray-400">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      className={`w-7 h-7 text-xs p-0 sm:w-8 sm:h-8 ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : 'bg-white dark:bg-[#2D3748] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => handlePageChange(page as number)}
                    >
                      {page}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-xs bg-white dark:bg-[#2D3748] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden xs:mr-1 xs:inline">Next</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>

          {/* Page Info */}
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            <div className="sm:hidden">
              {currentPage} of {totalPages}
            </div>
            <div className="hidden sm:block">
              Page {currentPage} of {totalPages} • Showing {startIndex + 1}-{Math.min(endIndex, sortedChapters.length)} of {sortedChapters.length} chapters
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
