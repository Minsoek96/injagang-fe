import { renderHook } from '@testing-library/react';

import Cookies from 'js-cookie';

import { useFetchUserInfo } from '@/src/entities/auth/mutations';
import useAuth from './useAuth';

// Cookies 모듈을 모킹
jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

// useFetchUserInfo 훅을 모킹
jest.mock('@/src/entities/auth/mutations', () => ({
  useFetchUserInfo: jest.fn(),
}));

describe('useAuth 훅', () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFetchUserInfo as jest.Mock).mockImplementation(() => ({
      mutate: mockMutate,
      isSuccess: false,
    }));
  });

  it('토큰이 없으면 프로필 요청을 수행하지 않아야 한다', () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useAuth());

    expect(mockMutate).not.toHaveBeenCalled();
    expect(result.current).toBe(false);
  });

  it('토큰이 있으면 프로필 요청을 수행해야 한다', () => {
    (Cookies.get as jest.Mock).mockReturnValue('fake-token');

    const { result } = renderHook(() => useAuth());

    expect(mockMutate).toHaveBeenCalled();
    expect(result.current).toBe(false);
  });

  it('프로필 요청이 성공하면 isSuccess를 반환해야 한다', () => {
    (Cookies.get as jest.Mock).mockReturnValue('fake-token');
    (useFetchUserInfo as jest.Mock).mockImplementation(() => ({
      mutate: mockMutate,
      isSuccess: true,
    }));

    const { result } = renderHook(() => useAuth());

    expect(mockMutate).toHaveBeenCalled();
    expect(result.current).toBe(true);
  });
});
