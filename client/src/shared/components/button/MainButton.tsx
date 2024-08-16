import styled from 'styled-components';

import { V } from '@/src/shared/styles';

import { BaseProps } from '@/src/shared/components/button/type';

export default function MainButton({
  onAction,
  label,
  sx = {},
  isActive = false,
  disabled = false,
  className = '',
  type = 'button',
}: BaseProps) {
  return (
    <CustomBtn
      onClick={onAction}
      style={sx}
      $isActive={isActive}
      disabled={disabled}
      className={className}
      type={type}
    >
      {label}
    </CustomBtn>
  );
}

interface CustomProps {
  $isActive: boolean;
  type?:'button' |'submit' | 'reset';
}

const CustomBtn = styled.button.attrs<CustomProps>((props) => ({
  type: props.type || 'button',
  role: 'button',
}))<CustomProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    (props.$isActive
      ? props.theme.colors.brandColor
      : props.theme.colors.button)};
  color: ${({ theme }) => theme.colors.text};
  border: 0.1em solid ${(props) => props.theme.colors.mainLine};
  padding: ${V.smPadding};
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.mainHover};
  }

  &:disabled {
   opacity: 0.3;
  }
`;
