import { useThemeToggler } from '@/src/shared/hooks';
import { BiSun, BiMoon } from 'react-icons/bi';

export default function ThemeToggle() {
  const [isDark, onToggle] = useThemeToggler();
  return (
    <>
      <div
        onClick={onToggle}
        style={{
          width: '100%',
        }}
      >
        {isDark ? <BiSun /> : <BiMoon />}
      </div>
      <span>
        {isDark ? '다크' : '밝게'}
      </span>
    </>
  );
}
