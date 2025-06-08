import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '@/store';
import { setFilteredChapters } from '@/store/slices/chaptersSlice';
import { applyFilters } from '@/utils/filterHelpers';

export function useChapters() {
  const dispatch = useDispatch();
  const chapters = useSelector((state: RootState) => state.chapters.chapters);
  const filteredChapters = useSelector((state: RootState) => state.chapters.filteredChapters);
  const filters = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    const filtered = applyFilters(chapters, filters);
    dispatch(setFilteredChapters(filtered));
  }, [chapters, filters, dispatch]);

  return { chapters, filteredChapters };
}
