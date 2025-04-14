import { act, renderHook } from '@testing-library/react';

import useBoardStore from '@/src/entities/qnaboard/model/useBoardStore';

import usePagination from './usePagination';

jest.mock('@/src/entities/qnaboard/model/useBoardStore');

describe('usePagination', () => {
  const context = describe;
  const setCurPageNum = jest.fn();

  /** 스토어의 현재 값 조정 */
  const mockCurrentPage = (curPage: number = 1) => {
    (useBoardStore as unknown as jest.Mock).mockImplementation((selector) => selector({
      setCurPageNum,
      curPageNum: curPage,
    }));
  };

  /** pagination 훅 */
  const mockPagiNationHook = (visiblePage: number = 8, totalPage: number = 20) => {
    const result = renderHook(() => usePagination(visiblePage, totalPage));
    return { ...result };
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('PageRanges, visible 기본값 8', () => {
    context('현재 페이지가 첫번째 그룹에 있으면', () => {
      it('startPage 값은 1, endPage 값은 8이다.', () => {
        mockCurrentPage(5);
        const { result } = mockPagiNationHook();
        expect(result.current.pageRanges.startPage).toBe(1);
        expect(result.current.pageRanges.endPage).toBe(8);
      });
    });

    context('현재 페이지가 두번째 그룹에 있으면', () => {
      it('startPage 값은 9, endPage 값은 16이다.', () => {
        mockCurrentPage(10);
        const { result } = mockPagiNationHook();
        expect(result.current.pageRanges.startPage).toBe(9);
        expect(result.current.pageRanges.endPage).toBe(16);
      });
    });

    context('현재 페이지가 마지막 그룹에 있으면', () => {
      it('endPage값은 totalPage와 같다.', () => {
        mockCurrentPage(9);
        const { result } = mockPagiNationHook(8, 13);
        expect(result.current.pageRanges.startPage).toBe(9);
        expect(result.current.pageRanges.endPage).toBe(13);
      });
    });
  });

  context('handlePrvePage 호출하면', () => {
    it('현재 페이지값이 -1이 된다.', async () => {
      mockCurrentPage(8);
      const { result } = mockPagiNationHook();
      expect(result.current.curPageNum).toBe(8);
      act(() => result.current.handlePrvePage());
      const updaeFn = setCurPageNum.mock.calls[0][0];
      expect(updaeFn(result.current.curPageNum)).toEqual(7);
    });
  });

  context('handleNextPage 호출하면', () => {
    it('현재 페이지값이 +1이 된다.', () => {
      mockCurrentPage(8);
      const { result } = mockPagiNationHook();
      expect(result.current.curPageNum).toBe(8);
      act(() => result.current.handleNextPage());
      const updaeFn = setCurPageNum.mock.calls[0][0];
      expect(updaeFn(result.current.curPageNum)).toEqual(9);
    });
  });
});
