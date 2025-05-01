import { useBoardStore } from '@/src/entities/qnaboard';
import { useCallback, useMemo } from 'react';

const SEARCH_TYPES = {
  전체: 'all',
  제목: 'title',
  작성자: 'writer',
} as const;

type SearchTypeKey = keyof typeof SEARCH_TYPES;
type SearchTypeValue = (typeof SEARCH_TYPES)[SearchTypeKey];

const REVERSE_SEARCH_TYPES: Record<SearchTypeValue, SearchTypeKey> = {
  all: '전체',
  title: '제목',
  writer: '작성자',
};

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

  const changeSearchTerm = useCallback(
    (newSearchTerm: string) => {
      if (!newSearchTerm.length) {
        return;
      }
      setBoardSearch(newSearchTerm);
    },
    [setBoardSearch],
  );

  const availableSearchTypes = useMemo(
    () => Object.keys(SEARCH_TYPES) as SearchTypeKey[],
    [],
  );

  const displaySearchType = useMemo(
    () => REVERSE_SEARCH_TYPES[boardType as 'all'|'title' | 'writer'] ?? '',
    [boardType],
  );

  return {
    displaySearchType,
    boardType,
    boardSearch,
    availableSearchTypes,
    changeSearchType,
    changeSearchTerm,
  };
};

export default useBoardSearch;
