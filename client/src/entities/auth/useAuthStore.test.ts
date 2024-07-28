import useAuthStore from '@/src/entities/auth/useAuthStore';
import { act } from '@testing-library/react';

describe('useAuthStore', () => {
  it('유저의 아이디를 저장한다.', () => {
    const testId = 'tester';
    act(() => useAuthStore.getState().setUserId(testId));

    const { userId } = useAuthStore.getState();
    expect(userId).toBe(testId);
  });

  it('유저의 권한을 저장한다.', () => {
    const authority = 'ADMIN';
    const nick = 'ADMIN';
    act(() => useAuthStore.getState().setUserInfo(authority, nick));

    const { role, nickName } = useAuthStore.getState();
    expect(role).not.toBe('USER');
    expect(role).toBe(authority);
    expect(nickName).toBe(nick);
  });
});
