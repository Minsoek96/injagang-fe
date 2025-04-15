import { useBoardStore } from '@/src/entities/qnaboard';
import { useCallback, useMemo } from 'react';

const SEARCH_TYPES = {
  제목: 'title',
  작성자: 'writer',
} as const;

type SearchTypeKey = keyof typeof SEARCH_TYPES;

const useBoardSearch = () => {
  const boardType = useBoardStore((state) => state.boardType);
  const boardSearch = useBoardStore((state) => state.boardSearch);
  const setBoardType = useBoardStore((state) => state.setBoardType);
  const setBoardSearch = useBoardStore((state) => state.setBoardSearch);

  const changeSearchType = useCallback(
    (selectedType: SearchTypeKey) => {
      const selectedTypeValue = SEARCH_TYPES[selectedType];
      if (selectedTypeValue) {
        setBoardType(selectedTypeValue);
      }
    },
    [setBoardType],
  );

  const changeSearchTerm = useCallback((newSearchTerm: string) => {
    if (!newSearchTerm.length) {
      return;
    }
    setBoardSearch(newSearchTerm);
  }, [setBoardSearch]);

  const availableSearchTypes = useMemo(
    () =>
    Object.keys(SEARCH_TYPES) as SearchTypeKey[],
    [],
  );

  return {
    boardType,
    boardSearch,
    availableSearchTypes,
    changeSearchType,
    changeSearchTerm,
  };
};

export default useBoardSearch;
