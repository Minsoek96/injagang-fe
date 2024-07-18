import useThemeToggler from '@/src/shared/hooks/useThemeToggler';
import { LocalStorageManager } from '@/src/shared/utils';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.mock('../utils', () => ({
  LocalStorageManager: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
    get: jest.fn(),
  })),
}));

describe('useThemeToggeler', () => {
  it('첫번째 배열은 상태를 나타낸다. 초기값은 false이다.', () => {
    const { result } = renderHook(() => useThemeToggler());
    expect(LocalStorageManager).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(true);
  });

  it('두번째 배열은 상태를 반전시킨다.', () => {
    const { result } = renderHook(() => useThemeToggler());
    expect(LocalStorageManager).toHaveBeenCalledTimes(1);
    act(() => {
      result.current[1]();
    });
    expect(LocalStorageManager).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(false);
  });
});
