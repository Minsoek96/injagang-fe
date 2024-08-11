import { act, renderHook } from '@testing-library/react';

import useInterval from '@/src/shared/hooks/useInterval';

const context = describe;

describe('useInterval', () => {
  const callback = jest.fn();
  const callInterval = (seconds:number) => {
    renderHook(() => useInterval(callback, seconds));
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('두번째 배열을 1000으로 설정 하면', () => {
    it('1초마다 콜백이 실행된다.', () => {
      jest.useFakeTimers();
      callInterval(1000);
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(callback).toHaveBeenCalledTimes(3);
    });
  });

  context('두번째 배열을 2000으로 설정 하면', () => {
    it('2초마다 콜백이 실행된다.', () => {
      jest.useFakeTimers();
      callInterval(2000);
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
