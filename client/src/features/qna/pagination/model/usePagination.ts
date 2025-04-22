import { useCallback, useMemo } from 'react';

import { useBoardStore } from '@/src/entities/qnaboard';

const usePagination = (visiblePage: number = 8, totalPage: number = 0) => {
  const setCurPageNum = useBoardStore((state) => state.setCurPageNum);
  const curPageNum = useBoardStore((state) => state.curPageNum);

  /** 페이지 범위 계산 */
  const pageRanges = useMemo(() => {
    const groupIndex = Math.floor((curPageNum - 1) / visiblePage);
    const minPageNumLimit = groupIndex * visiblePage;
    const maxPageNumLimit = (groupIndex + 1) * visiblePage;

    const startPage = minPageNumLimit + 1;
    const endPage = Math.min(maxPageNumLimit, totalPage);
    const pageCount = endPage - startPage + 1;

    // 방문 가능한 페이지 넘버
    const visiblePageNumbers = pageCount <= 0
      ? []
      : Array.from({ length: pageCount }, (_, i) => startPage + i);

    return {
      startPage,
      endPage,
      visiblePageNumbers,
      hasNext: curPageNum < totalPage,
      hasPrev: curPageNum > 1,
    };
  }, [curPageNum, visiblePage, totalPage]);

  /** 현재 클릭된 페이지 이동 */
  const handlePageSelect = useCallback((pageNum: number) => {
    setCurPageNum(() => pageNum);
  }, [setCurPageNum]);

  /** 이전 페이지 이동 */
  const handlePrvePage = useCallback(() => {
    if (curPageNum > 1) {
      setCurPageNum((prev) => prev - 1);
    }
  }, [curPageNum, setCurPageNum]);

  /** 다음 페이지 이동 */
  const handleNextPage = useCallback(() => {
    if (curPageNum < totalPage) {
      setCurPageNum((prev) => prev + 1);
    }
  }, [curPageNum, totalPage, setCurPageNum]);

  return {
    curPageNum,
    visiblePageNumbers: pageRanges.visiblePageNumbers,
    handlePageSelect,
    handlePrvePage,
    handleNextPage,
    hasNext: pageRanges.hasNext,
    hasPrev: pageRanges.hasPrev,
    pageRanges, // pageReanges 테스트 코드용
  };
};

export default usePagination;
