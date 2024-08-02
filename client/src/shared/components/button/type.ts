import { CSSProperties } from 'styled-components';

type BaseProps = {
    id?: string;
    onAction: () => void;
    label: string | React.ReactNode;
    sx?: CSSProperties;
    isActive? :boolean;
  };

export {
  type BaseProps,
};
