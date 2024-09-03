import { CSSProperties } from 'styled-components';

type TypeExists = {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

type TypeDoentExists = {
  type?: 'button' | 'submit' | 'reset';
  onClick: () => void;
};

type BaseProps = {
  id?: string;
  label: string | React.ReactNode;
  sx?: CSSProperties;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
} & (TypeExists | TypeDoentExists);

export { type BaseProps };
