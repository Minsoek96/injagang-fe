import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from 'react';

interface DropdownContextProps {
  isOpen: boolean;
  toggle: () => void;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(
  undefined,
);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('must be used within Dropdown');
  }
  return context;
};

interface DropdownProps {
  children: ReactNode;
}

/** Dropdown
 *
 * @subcomponent Dropdown.Trigger - 드롭다운을 열고 닫는 트리거 버튼
 * @subcomponent Dropdown.Menu - 드롭다운 메뉴 아이템들을 감싸는 컨테이너
 * @subcomponent Dropdown.Item - 개별 드롭다운 메뉴 아이템
 */
function Dropdown({ children }: DropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const clickOutSide = useCallback((event: MouseEvent) => {
    const { target } = event;
    if (
      containerRef.current
      && !containerRef.current.contains(target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', clickOutSide);
    return () => {
      document.removeEventListener('mousedown', clickOutSide);
    };
  }, [clickOutSide]);

  const toggle = () => setIsOpen((prev) => !prev);

  const value = useMemo(
    () => ({
      isOpen,
      toggle,
    }),
    [isOpen],
  );

  return (
    <DropdownContext.Provider value={value}>
      <div
        ref={containerRef}
        style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

interface DropdownTriggerProps {
  children: ReactNode;
}

function Trigger({ children }: DropdownTriggerProps) {
  const { toggle } = useDropdownContext();
  return <div onClick={toggle}>{children}</div>;
}

interface DropdownMenuProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

function Menu({ children, style = {} }: DropdownMenuProps) {
  const { isOpen } = useDropdownContext();

  // 기본 스타일과 전달받은 스타일 병합
  const defaultStyle: React.CSSProperties = {
    position: 'absolute',
  };

  const mergedStyle = { ...defaultStyle, ...style };

  return isOpen ? <div style={mergedStyle}>{children}</div> : null;
}

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void;
}

function Item({ children, onClick = () => {} }: DropdownItemProps) {
  const { toggle } = useDropdownContext();
  const handleClick = () => {
    if (onClick) onClick();
    toggle();
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
}

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export default Dropdown;
