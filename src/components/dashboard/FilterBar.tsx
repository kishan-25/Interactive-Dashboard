
// Updated FilterBar component with better dark mode support
'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import {
  setSelectedClasses,
  setSelectedUnits,
  setStatusFilter,
  setShowWeakChapters,
} from '@/store/slices/filtersSlice';
import { getUniqueClasses, getUniqueUnits } from '@/utils/filterHelpers';
import { Button } from '@/components/ui/button';

export function FilterBar() {
  const dispatch = useDispatch();
  const { chapters } = useSelector((state: RootState) => state.chapters);
  const filters = useSelector((state: RootState) => state.filters);

  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [showUnitsDropdown, setShowUnitsDropdown] = useState(false);

  const uniqueClasses = getUniqueClasses(chapters, filters.selectedSubject);
  const uniqueUnits = getUniqueUnits(chapters, filters.selectedSubject);

  const handleClassToggle = (className: string) => {
    const updated = filters.selectedClasses.includes(className)
      ? filters.selectedClasses.filter(c => c !== className)
      : [...filters.selectedClasses, className];
    dispatch(setSelectedClasses(updated));
  };

  const handleUnitToggle = (unitName: string) => {
    const updated = filters.selectedUnits.includes(unitName)
      ? filters.selectedUnits.filter(u => u !== unitName)
      : [...filters.selectedUnits, unitName];
    dispatch(setSelectedUnits(updated));
  };

  return (
    <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-600/40 sm:px-4 bg-white dark:bg-[#222E3F]">
      {/* Mobile: 2x2 Grid Layout */}
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        {/* Class Filter */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowClassDropdown(!showClassDropdown)}
            className="w-full h-8 text-xs font-medium bg-white dark:bg-transparent border-gray-300 dark:border-gray-600/60 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-full text-gray-900 dark:text-white"
          >
            Class {filters.selectedClasses.length > 0 && `(${filters.selectedClasses.length})`}
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
          {showClassDropdown && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-[#2A3441] border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto w-full min-w-[150px]">
              {uniqueClasses.map(className => (
                <label key={className} className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-600/30 cursor-pointer text-sm text-gray-900 dark:text-white">
                  <input
                    type="checkbox"
                    checked={filters.selectedClasses.includes(className)}
                    onChange={() => handleClassToggle(className)}
                    className="mr-2 w-3 h-3"
                  />
                  {className}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Units Filter */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowUnitsDropdown(!showUnitsDropdown)}
            className="w-full h-8 text-xs font-medium bg-white dark:bg-transparent border-gray-300 dark:border-gray-600/60 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-full text-gray-900 dark:text-white"
          >
            Units {filters.selectedUnits.length > 0 && `(${filters.selectedUnits.length})`}
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
          {showUnitsDropdown && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-[#2A3441] border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto w-full min-w-[180px]">
              {uniqueUnits.map(unitName => (
                <label key={unitName} className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-600/30 cursor-pointer text-sm text-gray-900 dark:text-white">
                  <input
                    type="checkbox"
                    checked={filters.selectedUnits.includes(unitName)}
                    onChange={() => handleUnitToggle(unitName)}
                    className="mr-2 w-3 h-3"
                  />
                  {unitName}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Not Started Filter */}
        <Button
          variant={filters.statusFilter === 'Not Started' ? 'default' : 'outline'}
          onClick={() =>
            dispatch(setStatusFilter(filters.statusFilter === 'Not Started' ? '' : 'Not Started'))
          }
          className={`h-8 text-xs font-medium rounded-full ${
            filters.statusFilter === 'Not Started'
              ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
              : 'bg-white dark:bg-transparent border-gray-300 dark:border-gray-600/60 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/30'
          }`}
        >
          Not Started
        </Button>

        {/* Weak Chapters Toggle */}
        <Button
          variant="outline"
          onClick={() => dispatch(setShowWeakChapters(!filters.showWeakChapters))}
          className={`relative h-8 text-xs font-medium rounded-full z-0 border overflow-hidden ${
            filters.showWeakChapters
              ? 'text-orange-400 border-orange-500/60 bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/60 dark:bg-orange-500/10'
              : 'text-gray-900 dark:text-white border-gray-300 dark:border-gray-600/60 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700/30'
          }`}
        >
          <span className="truncate">Weak Chapters</span>
        </Button>
      </div>

      {/* Desktop: Horizontal Layout */}
      <div className="hidden sm:flex sm:flex-wrap sm:gap-2 md:flex-nowrap">
        {/* Class Filter */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowClassDropdown(!showClassDropdown)}
            className="min-w-[80px] h-8 text-xs font-medium bg-white dark:bg-transparent border-gray-300 dark:border-gray-600/60 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-full text-gray-900 dark:text-white"
          >
            Class {filters.selectedClasses.length > 0 && `(${filters.selectedClasses.length})`}
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
          {showClassDropdown && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-[#2A3441] border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto min-w-[150px]">
              {uniqueClasses.map(className => (
                <label key={className} className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-600/30 cursor-pointer text-sm text-gray-900 dark:text-white">
                  <input
                    type="checkbox"
                    checked={filters.selectedClasses.includes(className)}
                    onChange={() => handleClassToggle(className)}
                    className="mr-2 w-3 h-3"
                  />
                  {className}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Units Filter */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowUnitsDropdown(!showUnitsDropdown)}
            className="min-w-[80px] h-8 text-xs font-medium bg-white dark:bg-transparent border-gray-300 dark:border-gray-600/60 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-full text-gray-900 dark:text-white"
          >
            Units {filters.selectedUnits.length > 0 && `(${filters.selectedUnits.length})`}
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
          {showUnitsDropdown && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-[#2A3441] border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto min-w-[180px]">
              {uniqueUnits.map(unitName => (
                <label key={unitName} className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-600/30 cursor-pointer text-sm text-gray-900 dark:text-white">
                  <input
                    type="checkbox"
                    checked={filters.selectedUnits.includes(unitName)}
                    onChange={() => handleUnitToggle(unitName)}
                    className="mr-2 w-3 h-3"
                  />
                  {unitName}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Not Started Filter */}
        <Button
          variant={filters.statusFilter === 'Not Started' ? 'default' : 'outline'}
          onClick={() =>
            dispatch(setStatusFilter(filters.statusFilter === 'Not Started' ? '' : 'Not Started'))
          }
          className={`h-8 px-3 text-xs font-medium rounded-full ${
            filters.statusFilter === 'Not Started'
              ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
              : 'bg-white dark:bg-transparent border-gray-300 dark:border-gray-600/60 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/30'
          }`}
        >
          Not Started
        </Button>

        {/* Weak Chapters Toggle */}
        <Button
          variant="outline"
          onClick={() => dispatch(setShowWeakChapters(!filters.showWeakChapters))}
          className={`relative h-8 px-3 text-xs font-medium rounded-full z-0 border overflow-hidden ${
            filters.showWeakChapters
              ? 'text-orange-400 border-orange-500/60 bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/60 dark:bg-orange-500/10'
              : 'text-gray-900 dark:text-white border-gray-300 dark:border-gray-600/60 bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700/30'
          }`}
        >
          Weak Chapters
        </Button>
      </div>
    </div>
  );
}