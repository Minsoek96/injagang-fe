import { BiSun, BiMoon } from 'react-icons/bi';

import { DropBoxStyle } from '@/src/shared/ui';
import { useThemeToggler } from '@/src/shared/hooks';

export default function ThemeToggle() {
  const [isDark, onToggle] = useThemeToggler();
  return (
    <DropBoxStyle.ItemWrapper onClick={onToggle}>
      <div>{isDark ? <BiSun /> : <BiMoon />}</div>
      <span>{isDark ? '밝게' : '다크'}</span>
    </DropBoxStyle.ItemWrapper>
  );
}
