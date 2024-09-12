import { act, renderHook } from '@testing-library/react';

import useCheckList from '@/src/shared/hooks/checklist/useCheckList';

import { sampleCheckList } from '@/fixutures/shared';

describe('useCheckList', () => {
  const context = describe;

  const callAllCheck = () => {
    const { result } = renderHook(() => useCheckList(sampleCheckList));
    expect(result.current.isAllCheck).toBe(false);
    act(() => result.current.handleAllCheck());
    return { result };
  };

  const callCheckList = () => {
    const { result } = renderHook(() => useCheckList(sampleCheckList));
    act(() => result.current.handleCheckList(4, false));
    return { result };
  };

  context('초기 렌더링 시', () => {
    it('checkList의 상태는 [], isAllCheck의 상태는 false이다', () => {
      const { result } = renderHook(() => useCheckList(sampleCheckList));
      expect(result.current.checkList).toEqual([]);
      expect(result.current.isAllCheck).toBe(false);
    });
  });

  context('handleAllCheck를 호출 하면', () => {
    it('isAllCheck의 상태가 반전된다', () => {
      const { result } = callAllCheck();
      expect(result.current.isAllCheck).toBe(true);
    });

    it('모든 sampleCheckList의 id가 checkList에 등록된다.', () => {
      const { result } = callAllCheck();
      expect(result.current.checkList).toEqual(
        sampleCheckList.map((item) => item.id),
      );
    });

    it('재호출시 다시 한번 반전된다.', () => {
      const { result } = callAllCheck();
      act(() => result.current.handleAllCheck());
      expect(result.current.isAllCheck).toBe(false);
      expect(result.current.checkList).toEqual([]);
    });
  });

  context('handleChecKList를 호출하면', () => {
    it('isCheck의 인자가 false이면 체크리스트를 추가한다.', () => {
      const { result } = callCheckList();
      expect(result.current.checkList).toHaveLength(1);
      act(() => result.current.handleCheckList(5, false));
      expect(result.current.checkList).toHaveLength(2);
    });

    it('isChheck의 인자가 true이면 체크리스트를 해제한다.', () => {
      const { result } = callCheckList();
      expect(result.current.checkList).toHaveLength(1);
      act(() => result.current.handleCheckList(4, true));
      expect(result.current.checkList).toHaveLength(0);
    });
  });
});
