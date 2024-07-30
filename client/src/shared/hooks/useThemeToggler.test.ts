import { act, renderHook } from '@testing-library/react';

import useThemeToggler from './useThemeToggler';

import { LocalStorageManager } from '../utils';

jest.mock('../utils');

describe('useThemeToggeler', () => {
  const context = describe;
  let getMock: jest.SpyInstance;
  let saveMock: jest.SpyInstance;

  const renderChangeToggle = () => {
    const { result } = renderHook(() => useThemeToggler());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1]());
    return { result };
  };

  beforeEach(() => {
    getMock = jest
      .spyOn(LocalStorageManager.prototype, 'get')
      .mockImplementation();
    saveMock = jest
      .spyOn(LocalStorageManager.prototype, 'save')
      .mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('초기 렌더링 시 저장된 테마모드를 설정해야 한다.', () => {
    const themeValue = { theme: false };
    getMock.mockReturnValue(themeValue);
    const { result } = renderHook(() => useThemeToggler());
    expect(getMock).toHaveBeenCalled();
    expect(result.current[0]).toBe(themeValue.theme);
  });

  context('ChangeToggleTheme를 호출하면', () => {
    it('currentMode의 상태가 반전된다.', () => {
      const { result } = renderChangeToggle();
      expect(result.current[0]).toBe(false);
    });

    it('새로운 상태를 로컬스토리지에 저장한다.', () => {
      const { result } = renderHook(() => useThemeToggler());
      act(() => result.current[1]());
      expect(saveMock).toHaveBeenCalled();
    });
  });
});
