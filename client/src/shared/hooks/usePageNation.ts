import { useBoardStore } from '@/src/entities/qnaboard';
import { useState, useCallback } from 'react';

const usePageNation = (visiblePage : number = 8) => {
  const { setCurPageNum, curPageNum, totalPage } = useBoardStore();
  const [minPageNumLimit, setMinPageNumLimit] = useState<number>(0);
  const [maxPageNumLimit, setMaxPageNumLimit] = useState<number>(visiblePage);

  const MIN_PAGE = 1;

  const handlePageClick = useCallback((pageNum: number) => {
    setCurPageNum(() => pageNum);
  }, []);

  const handlePrevClick = useCallback(() => {
    if (curPageNum > MIN_PAGE) {
      setCurPageNum((prev) => prev - 1);
      if (curPageNum === minPageNumLimit + 1) {
        setMinPageNumLimit((prev) => prev - visiblePage);
        setMaxPageNumLimit((prev) => prev - visiblePage);
      }
    }
  }, [curPageNum, minPageNumLimit, maxPageNumLimit]);

  const handleNextClick = useCallback(() => {
    if (curPageNum < totalPage) {
      setCurPageNum((prev) => prev + 1);
      if (curPageNum === maxPageNumLimit) {
        setMinPageNumLimit((prev) => prev + visiblePage);
        setMaxPageNumLimit((prev) => prev + visiblePage);
      }
    }
  }, [curPageNum, minPageNumLimit, maxPageNumLimit]);

  const visiblePageNumbers = Array.from({ length: totalPage })
    .map((_, idx) => idx + 1)
    .filter(
      (pageNum) => pageNum > minPageNumLimit && pageNum <= maxPageNumLimit,
    );

  return {
    curPageNum,
    visiblePageNumbers,
    handlePageClick,
    handlePrevClick,
    handleNextClick,
  };
};

export default usePageNation;
