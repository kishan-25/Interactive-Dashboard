// src/store/slices/filtersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '@/types/chapter';

const initialState: FilterState = {
  selectedSubject: 'Physics',
  selectedClasses: [],
  selectedUnits: [],
  statusFilter: '',
  showWeakChapters: false,
  sortOrder: 'asc',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedSubject: (state, action: PayloadAction<'Physics' | 'Chemistry' | 'Mathematics'>) => {
      state.selectedSubject = action.payload;
      state.selectedClasses = [];
      state.selectedUnits = [];
      state.statusFilter = '';
    },
    setSelectedClasses: (state, action: PayloadAction<string[]>) => {
      state.selectedClasses = action.payload;
    },
    setSelectedUnits: (state, action: PayloadAction<string[]>) => {
      state.selectedUnits = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    setShowWeakChapters: (state, action: PayloadAction<boolean>) => {
      state.showWeakChapters = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  setSelectedSubject,
  setSelectedClasses,
  setSelectedUnits,
  setStatusFilter,
  setShowWeakChapters,
  setSortOrder,
} = filtersSlice.actions;

export default filtersSlice.reducer;