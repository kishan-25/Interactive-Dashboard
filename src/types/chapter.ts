export interface YearWiseQuestionCount {
  [year: string]: number;
}

export interface Chapter {
  subject: 'Physics' | 'Chemistry' | 'Mathematics';
  chapter: string;
  class: string;
  unit: string;
  yearWiseQuestionCount: YearWiseQuestionCount;
  questionSolved: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  isWeakChapter: boolean;
}

export interface FilterState {
  selectedSubject: 'Physics' | 'Chemistry' | 'Mathematics';
  selectedClasses: string[];
  selectedUnits: string[];
  statusFilter: string;
  showWeakChapters: boolean;
  sortOrder: 'asc' | 'desc';
}
