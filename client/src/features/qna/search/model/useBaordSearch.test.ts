import { renderHook } from '@testing-library/react';

import { act } from 'react-dom/test-utils';
import { useBoardStore } from '@/src/entities/qnaboard';
import useBoardSearch from './useBaordSearch';

jest.mock('@/src/entities/qnaboard/model/useBoardStore');

const context = describe;
describe('useBoardSearch', () => {
  /** 스토어의 현재 값 조정 */
  const setBoardType = jest.fn();
  const setBoardSearch = jest.fn();

  const mockBoardStore = (type: string = '', search: string = '') => {
    (useBoardStore as unknown as jest.Mock).mockImplementation((selector) => selector({
      setBoardType,
      setBoardSearch,
      boardType: type,
      boardSearch: search,
    }));
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockBoardStore();
  });

  context('검색 타입을 변경하면', () => {
    it('검색 타입이 제목인 경우 "title"로 변환 된다.', () => {
      const { result } = renderHook(() => useBoardSearch());
      expect(result.current.boardType).toBe('');
      act(() => result.current.changeSearchType('제목'));
      expect(setBoardType).toHaveBeenCalledWith('title');
    });

    it('검색 타입이 작성자인 경우 "writer"로 변환 된다.', () => {
      const { result } = renderHook(() => useBoardSearch());
      expect(result.current.boardType).toBe('');
      act(() => result.current.changeSearchType('작성자'));
      expect(setBoardType).toHaveBeenCalledWith('writer');
    });

    it('그 외의 경우는 변환되지 않는다.', () => {
      const { result } = renderHook(() => useBoardSearch());
      expect(result.current.boardType).toBe('');
      // @ts-expect-error - 테스트 용
      act(() => result.current.changeSearchType('테스트'));
      expect(setBoardType).not.toHaveBeenCalledWith('test');
      // @ts-expect-error - 테스트 용
      act(() => result.current.changeSearchType('유튜브'));
      expect(setBoardType).not.toHaveBeenCalledWith('youtube');
    });

    it('사용 가능한 검색 타입은 제목 | 작성자 이다', () => {
      const { result } = renderHook(() => useBoardSearch());
      expect(result.current.availableSearchTypes).toEqual(['제목', '작성자']);
    });
  });

  context('검색어 변경', () => {
    it('새로운 검색어가 입력되면 검색어가 변환된다.', () => {
      const { result } = renderHook(() => useBoardSearch());
      expect(result.current.boardSearch).toBe('');
      act(() => result.current.changeSearchTerm('테스트'));
      expect(setBoardSearch).toHaveBeenCalledWith('테스트');
    });

    it('검색어가 빈값 이라면 적용되지 않는다.', () => {
      const { result } = renderHook(() => useBoardSearch());
      expect(result.current.boardSearch).toBe('');
      act(() => result.current.changeSearchTerm(''));
      expect(setBoardSearch).not.toHaveBeenCalled();
    });
  });

  context('검색 타입 역변환', () => {
    it('타입이 tittle이면 제목으로 변환한다.', () => {
      mockBoardStore('title');
      const { result } = renderHook(() => useBoardSearch());
      expect(result.current.displaySearchType).toBe('제목');
    });

    it('타입이 writer이면 작성자로 변환한다.', () => {
      mockBoardStore('writer');
      const { result } = renderHook(() => useBoardSearch());
      expect(result.current.displaySearchType).toBe('작성자');
    });

    it('그외 타입이면 " "로 변환한다.', () => {
      mockBoardStore('tester');
      const { result } = renderHook(() => useBoardSearch());
      expect(result.current.displaySearchType).toBe('');
    });
  });
});
