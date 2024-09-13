import { ButtonHTMLAttributes } from 'react';

import { CSSProperties } from 'styled-components';

interface BaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | React.ReactNode;
  sx?: CSSProperties;
  isActive?: boolean;
}

export { type BaseProps };
