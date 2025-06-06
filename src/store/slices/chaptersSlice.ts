// src/store/slices/chaptersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chapter } from '@/types/chapter';
import { mockChapters } from '@/data/mockData';

interface ChaptersState {
  chapters: Chapter[];
  filteredChapters: Chapter[];
}

const initialState: ChaptersState = {
  chapters: mockChapters,
  filteredChapters: mockChapters.filter(ch => ch.subject === 'Physics'),
};

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setFilteredChapters: (state, action: PayloadAction<Chapter[]>) => {
      state.filteredChapters = action.payload;
    },
  },
});

export const { setFilteredChapters } = chaptersSlice.actions;
export default chaptersSlice.reducer;