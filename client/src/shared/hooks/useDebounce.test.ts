import { renderHook, act } from '@testing-library/react';

import useDebounce from './useDebounce';

jest.useFakeTimers();

describe('useDebounce 훅', () => {
  it('초기값을 즉시 반환해야 한다.', () => {
    const { result } = renderHook(() => useDebounce('initial'));
    expect(result.current).toBe('initial');
  });

  it('지연된 후에 업데이트된 값을 반환해야 한다.', () => {
    const { result, rerender } = renderHook(
      ({ value, time }) => useDebounce(value, time),
      {
        initialProps: { value: 'initial', time: 500 },
      },
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', time: 500 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('설정된 시간 이전에는 업데이트되지 않아야 한다.', () => {
    const { result, rerender } = renderHook(
      ({ value, time }) => useDebounce(value, time),
      {
        initialProps: { value: 'initial', time: 500 },
      },
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', time: 500 });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(result.current).toBe('updated');
  });
});
