import { act, renderHook } from '@testing-library/react';

import useCheckList from '@/src/shared/hooks/checklist/useCheckList';

import { sampleCheckList } from '@/fixutures/shared';

describe('useCheckList', () => {
  const renderUseCheckList = () => renderHook(() => useCheckList(sampleCheckList));

  describe('초기 렌더링 시', () => {
    it('checkList는 빈 배열, isAllCheck는 false이다.', () => {
      const { result } = renderUseCheckList();
      expect(result.current.checkList).toEqual([]);
      expect(result.current.isAllCheck).toBe(false);
    });
  });

  describe('handleAllCheck 호출 시', () => {
    it('isAllCheck 상태가 반전된다.', () => {
      const { result } = renderUseCheckList();
      expect(result.current.isAllCheck).toBe(false);

      act(() => result.current.handleAllCheck());
      expect(result.current.isAllCheck).toBe(true);

      act(() => result.current.handleAllCheck());
      expect(result.current.isAllCheck).toBe(false);
    });

    it('모든 항목이 checkList에 추가된다.', () => {
      const { result } = renderUseCheckList();
      act(() => result.current.handleAllCheck());
      expect(result.current.checkList).toEqual(sampleCheckList.map((item) => item.id));
    });

    it('다시 호출하면 checkList가 초기화된다.', () => {
      const { result } = renderUseCheckList();
      act(() => result.current.handleAllCheck()); // 전체 선택
      act(() => result.current.handleAllCheck()); // 전체 해제
      expect(result.current.checkList).toEqual([]);
    });
  });

  describe('handleCheckList 호출 시', () => {
    it('해당 항목이 선택되지 않은 상태면 checkList에 추가된다.', () => {
      const { result } = renderUseCheckList();
      act(() => result.current.handleCheckList(4));
      expect(result.current.checkList).toContain(4);
      expect(result.current.checkList).toHaveLength(1);
    });

    it('해당 항목이 선택된 상태면 checkList에서 제거된다.', () => {
      const { result } = renderUseCheckList();
      act(() => result.current.handleCheckList(4));
      act(() => result.current.handleCheckList(4));
      expect(result.current.checkList).not.toContain(4);
      expect(result.current.checkList).toHaveLength(0);
    });

    it('여러 항목을 선택하면 checkList에 모두 추가된다.', () => {
      const { result } = renderUseCheckList();
      act(() => result.current.handleCheckList(4));
      act(() => result.current.handleCheckList(5));
      expect(result.current.checkList).toContain(4);
      expect(result.current.checkList).toContain(5);
      expect(result.current.checkList).toHaveLength(2);
    });
  });
});
