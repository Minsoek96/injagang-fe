import { useCallback, useEffect } from 'react';

import { LocalStorageManager } from '@/src/shared/utils';
import { useThemeStore } from '@/src/shared/store';

type StoraTheme = {
  theme: boolean
}
const storage = new LocalStorageManager('theme');
const useThemeToggler = (): [boolean, () => void] => {
  const currentMode = useThemeStore((state) => state.isDark);
  const changeThemeMode = useThemeStore((state) => state.changeThemeMode);

  const ChangeToggleTheme = useCallback(() => {
    const saveValue = { theme: !currentMode };

    changeThemeMode(!currentMode);
    storage.save<StoraTheme>(saveValue);
  }, [currentMode, changeThemeMode]);

  useEffect(() => {
    const currentSaveMode = storage.get<StoraTheme>();
    if (currentSaveMode) {
      changeThemeMode(currentSaveMode.theme);
    }
  }, []);

  return [currentMode, ChangeToggleTheme];
};

export default useThemeToggler;
