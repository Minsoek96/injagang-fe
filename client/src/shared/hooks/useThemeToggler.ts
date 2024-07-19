import { useCallback, useEffect } from 'react';

import { LocalStorageManager } from '@/src/shared/utils';
import { useThemeStore } from '@/src/shared/store';

const storage = new LocalStorageManager('theme');
const useThemeToggler = (): [boolean, () => void] => {
  const { isDark: currentMode, changeThemeMode } = useThemeStore();

  const ChangeToggleTheme = useCallback(() => {
    const saveValue = !currentMode;

    changeThemeMode(saveValue);
    storage.save(saveValue);
  }, [currentMode, changeThemeMode]);

  useEffect(() => {
    const currentSaveMode = storage.get();
    if (currentSaveMode) {
      changeThemeMode(currentSaveMode);
    }
  }, []);

  return [currentMode, ChangeToggleTheme];
};

export default useThemeToggler;
