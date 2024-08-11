import useCounter from '@/src/shared/hooks/useCounter';
import { act, renderHook } from '@testing-library/react';

const context = describe;
describe('useConter', () => {
  context('MaxCounter가 5라면', () => {
    it('counter는 5이상 올라가지 않는다', () => {
      const { result } = renderHook(() => useCounter({ maxCounter: 5 }));

      Array.from({ length: 5 }).forEach(() => {
        act(() => result.current.handleIncrease());
      });

      expect(result.current.counter).toBe(5);
      act(() => result.current.handleIncrease());
      expect(result.current.counter).not.toBe(6);
      expect(result.current.counter).toBe(5);
    });
  });

  context('MinCounter가 0이라면', () => {
    it('counter는 0보다 작아질수 없다.', () => {
      const { result } = renderHook(() =>
        useCounter({ maxCounter: 5, minCounter: 0 }));

      Array.from({ length: 5 }).forEach(() => {
        act(() => result.current.handleDecrease());
      });

      expect(result.current.counter).toBeLessThanOrEqual(0);
    });
  });
});
