/* eslint-disable no-shadow */
import { act, renderHook } from '@testing-library/react';

import usePageNation from '@/src/shared/hooks/usePageNation';

import useBoardStore from '@/src/entities/qnaboard/useBoardStore';

jest.mock('@/src/entities/qnaboard/useBoardStore');
describe('usePageNation', () => {
  const context = describe;
  const setCurPageNum = jest.fn();

  /** Mock 초깃값을 조절 */
  const mockImplementBoardStore = ({
    curPage = 1,
    total = 20,
  }: {
    curPage?: number;
    total?: number;
  }) => {
    (useBoardStore as unknown as jest.Mock).mockImplementation(() => ({
      setCurPageNum,
      curPageNum: curPage,
      totalPage: total,
    }));
  };

  /** handleClick함수를 실행 */
  const callClick = ({
    equal = 1,
    mode,
  }: {
    equal: number;
    mode: 'prev' | 'next';
  }) => {
    const { result } = renderHook(() => usePageNation(8));
    expect(result.current.curPageNum).toEqual(equal);
    act(() => {
      mode === 'prev'
        ? result.current.handlePrevClick()
        : result.current.handleNextClick();
    });
    return { result };
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handlePageClick의 값을 전달하면 업데이트 함수가 전달된다.', () => {
    mockImplementBoardStore({});
    const { result } = renderHook(() => usePageNation(8));
    act(() => {
      result.current.handlePageClick(4);
    });
    expect(setCurPageNum).toHaveBeenCalledWith(expect.any(Function));
  });

  context('handleNextClick이 호출되면', () => {
    it('현재 페이지가 전체 페이지 수보다 작으면 1 증가한다.', () => {
      mockImplementBoardStore({});
      const { result } = callClick({ equal: 1, mode: 'next' });
      const updateFn = setCurPageNum.mock.calls[0][0];
      expect(updateFn(result.current.curPageNum)).toEqual(2);
    });

    it('현재 페이지가 전체페이지 수와 같거나 크면 유지된다.', () => {
      mockImplementBoardStore({ curPage: 20 });
      callClick({ equal: 20, mode: 'next' });
      expect(setCurPageNum).toHaveBeenCalledTimes(0);
    });
  });

  context('handlePrevClick이 호출되면', () => {
    it('현재 페이지가 1이상일 경우 페이지 수가 1 감소한다.', () => {
      mockImplementBoardStore({ curPage: 2 });
      const { result } = callClick({ equal: 2, mode: 'prev' });
      const updateFn = setCurPageNum.mock.calls[0][0];
      expect(updateFn(result.current.curPageNum)).toEqual(1);
    });

    it('페이지의 최솟값은 1이다. 1 이하로 감소하지 않는다.', () => {
      mockImplementBoardStore({});
      callClick({ equal: 1, mode: 'prev' });
      expect(setCurPageNum).toHaveBeenCalledTimes(0);
    });
  });
});
