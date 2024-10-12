import { renderHook } from '@testing-library/react';

import Cookies from 'js-cookie';

import { useFetchUserInfo } from '@/src/entities/auth/api/mutations';
import { useAuthStore } from '@/src/entities/auth';
import useAuth from './useAuth';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

jest.mock('@/src/entities/auth/api/mutations', () => ({
  useFetchUserInfo: jest.fn(),
}));

jest.mock('@/src/entities/auth', () => ({
  useAuthStore: jest.fn(),
}));

const context = describe;

describe('useAuth 훅', () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFetchUserInfo as jest.Mock).mockImplementation(() => ({
      mutate: mockMutate,
    }));
  });

  context('userId가 변경될 때', () => {
    it('프로필을 다시 가져온다', () => {
      (Cookies.get as jest.Mock).mockReturnValue('fake-token');
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        userId: 10000,
        role: 'tester',
      });
      renderHook(() => useAuth());
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  context('토큰이 없는 경우', () => {
    it('토큰이 없으면 프로필 요청을 수행하지 않아야 한다', () => {
      (Cookies.get as jest.Mock).mockReturnValue(undefined);
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        userId: null,
        role: null,
      });
      renderHook(() => useAuth());
      expect(mockMutate).not.toHaveBeenCalled();
    });

    it('토큰이 없으면 false를 리턴 해야한다.', () => {
      (Cookies.get as jest.Mock).mockReturnValue(undefined);
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        userId: null,
        role: null,
      });
      const { result } = renderHook(() => useAuth());
      expect(result.current).toBe(false);
    });
  });

  context('토큰이 존재하는 경우', () => {
    it('토큰이 있으면 프로필 요청을 수행해야 한다.', () => {
      (Cookies.get as jest.Mock).mockReturnValue('fake-token');
      renderHook(() => useAuth());
      expect(mockMutate).toHaveBeenCalled();
    });

    it('프로필 요청이 성공하면 isSuccess를 반환해야 한다', () => {
      (Cookies.get as jest.Mock).mockReturnValue('fake-token');
      (useAuthStore as unknown as jest.Mock).mockReturnValue({
        userId: 10000,
        role: 'Tester',
      });

      const { result } = renderHook(() => useAuth());

      expect(mockMutate).toHaveBeenCalled();
      expect(result.current).toBe(true);
    });
  });
});
