import { CSSProperties } from 'styled-components';

type BaseProps = {
    id?: string;
    onAction: () => void;
    label: string | React.ReactNode;
    sx?: CSSProperties;
  };

export {
  type BaseProps,
};
