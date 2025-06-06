'use client';

import { useSelector, useDispatch } from 'react-redux';
import { Atom, Flask, MathOperations } from '@phosphor-icons/react';
import { RootState } from '@/store';
import { setSelectedSubject } from '@/store/slices/filtersSlice';
import Image from 'next/image';

export function Sidebar() {
  const dispatch = useDispatch();
  const selectedSubject = useSelector((state: RootState) => state.filters.selectedSubject);

  const subjects = [
    {
      id: 'Physics',
      name: 'Physics PYQs',
      icon: Atom,
      bgColor: 'bg-orange-500',
    },
    {
      id: 'Chemistry',
      name: 'Chemistry PYQs',
      icon: Flask,
      bgColor: 'bg-green-500',
    },
    {
      id: 'Mathematics',
      name: 'Mathematics PYQs',
      icon: MathOperations,
      bgColor: 'bg-blue-500',
    }
  ];

  const handleSubjectChange = (subjectId: string) => {
    dispatch(setSelectedSubject(subjectId as 'Physics' | 'Chemistry' | 'Mathematics'));
  };

  return (
    <div className="w-64 bg-card border-r border-border/40 h-full">
      {/* Header */}
      <div className="p-4 border-b border-border/40">
       <div className="flex justify-center items-center gap-2 mb-2">
  <div className="w-6 h-6">
    <Image
      src="/exam-logo.png"
      alt="Exam Logo"
      width={24}
      height={24}
      className="rounded-full object-contain"
    />
  </div>
  <h2 className="font-semibold text-foreground text-lg">JEE Main</h2>
</div>

        <p className="text-xs text-muted-foreground">2025 - 2009 | 173 Papers | 15825 Qs</p>
      </div>

      {/* Subject List */}
      <div className="p-2">
        {subjects.map((subject) => {
          const IconComponent = subject.icon;
          const isSelected = selectedSubject === subject.id;

          return (
            <button
              key={subject.id}
              onClick={() => handleSubjectChange(subject.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors mb-1 relative ${
                isSelected ? 'bg-[#1D2933]' : 'hover:bg-accent/30'
              }`}
            >
              {/* Left white bar indicator */}
              {isSelected && (
                <div className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md" />
              )}

              {/* Subject Icon */}
              <div className={`w-6 h-6 ${subject.bgColor} rounded-full flex items-center justify-center text-white z-10`}>
                <IconComponent size={16} />
              </div>

              {/* Subject Name */}
              <div className="flex-1">
                <div className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-muted-foreground'}`}>
                  {subject.name}
                </div>
              </div>

              {/* Right Arrow Icon */}
              <svg
                className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-muted-foreground'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}
