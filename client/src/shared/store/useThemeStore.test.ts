import { act } from '@testing-library/react';
import useThemeStore from './useThemeStore';

describe('useThemeStore 훅', () => {
  const context = describe;

  context('토글 버튼이 OFF 일때', () => {
    it('isDark가 true를 반환한다.', () => {
      const { isDark } = useThemeStore.getState();
      expect(isDark).toBe(true);
    });

    context('changeThemeMode에 boolean값을 전달하면', () => {
      it('isDark의 값은 해당 boolean값이 된다', () => {
        act(() => useThemeStore.getState().changeThemeMode(false));
        const { isDark } = useThemeStore.getState();
        expect(isDark).toBe(false);

        act(() => useThemeStore.getState().changeThemeMode(true));
        expect(useThemeStore.getState().isDark).toBe(true);
      });
    });
  });
});
