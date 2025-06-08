'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { SubjectTabs } from '@/components/dashboard/SubjectTabs';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { ChapterList } from '@/components/dashboard/ChapterList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1A202C]">
      {/* Mobile Layout */}
      <div className="flex flex-col h-screen sm:hidden">
        <main className="flex-1 overflow-auto">
          <SubjectTabs />
          <FilterBar />
          <ChapterList />
        </main>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <SubjectTabs />
          <FilterBar />
          <ChapterList />
        </main>
      </div>
    </div>
  );
}
