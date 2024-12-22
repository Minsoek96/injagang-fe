import { ButtonHTMLAttributes, CSSProperties } from 'react';

import styled from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';

import { VariantProps, buttonVariants } from './variants';

interface BaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | React.ReactNode;
  sx?: CSSProperties;
  isActive?: boolean;
  variant?: VariantProps;
}

export default function MainButton({
  onClick,
  label,
  sx = {},
  isActive = false,
  disabled = false,
  className = '',
  type = 'button',
  variant = 'default',
}: BaseProps) {
  return (
    <CustomBtn
      onClick={onClick}
      style={sx}
      $isActive={isActive}
      disabled={disabled}
      className={className}
      type={type}
      $variant={variant}
    >
      {label}
    </CustomBtn>
  );
}

interface CustomProps {
  $isActive: boolean;
  $variant: VariantProps;
  type?:'button' |'submit' | 'reset';
}

const CustomBtn = styled.button.attrs<CustomProps>((props) => ({
  type: props.type || 'button',
  role: 'button',
}))<CustomProps>`
  ${styleMixin.Flex()}
  padding: ${V.smPadding};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;

  ${({ $variant }) => buttonVariants[$variant]}

  &:disabled {
    opacity: 0.3;
  }
`;
