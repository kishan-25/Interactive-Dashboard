import { Chapter, FilterState } from '@/types/chapter';

export function getUniqueClasses(chapters: Chapter[], selectedSubject: string): string[] {
  return [...new Set(chapters
    .filter(chapter => chapter.subject === selectedSubject)
    .map(chapter => chapter.class)
  )].sort();
}

export function getUniqueUnits(chapters: Chapter[], selectedSubject: string): string[] {
  return [...new Set(chapters
    .filter(chapter => chapter.subject === selectedSubject)
    .map(chapter => chapter.unit)
  )].sort();
}

export function getTotalQuestions(chapter: Chapter): number {
  return Object.values(chapter.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0);
}

export function applyFilters(chapters: Chapter[], filters: FilterState): Chapter[] {
  return chapters.filter(chapter => {
    // Subject filter
    if (chapter.subject !== filters.selectedSubject) return false;
    
    // Class filter
    if (filters.selectedClasses.length > 0 && !filters.selectedClasses.includes(chapter.class)) {
      return false;
    }
    
    // Unit filter
    if (filters.selectedUnits.length > 0 && !filters.selectedUnits.includes(chapter.unit)) {
      return false;
    }
    
    // Status filter
    if (filters.statusFilter && chapter.status !== filters.statusFilter) {
      return false;
    }
    
    // Weak chapters filter
    if (filters.showWeakChapters && !chapter.isWeakChapter) {
      return false;
    }
    
    return true;
  });
}
