import { configureStore } from '@reduxjs/toolkit';
import chaptersReducer from './slices/chaptersSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    chapters: chaptersReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
