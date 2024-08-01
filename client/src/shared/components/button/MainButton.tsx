import { BaseProps } from '@/src/shared/components/button/type';
import { V } from '@/src/shared/styles';
import styled from 'styled-components';

export default function MainButton({
  onAction,
  label,
  sx = {},
  isActive = false,
}: BaseProps) {
  return (
    <CustomBtn onClick={onAction} style={sx} $isActive={isActive}>
      {label}
    </CustomBtn>
  );
}

interface CustomProps {
  $isActive: boolean;
}

const CustomBtn = styled.button.attrs({
  type: 'button',
  role: 'button',
})<CustomProps>`
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
    background-color: ${(props) => props.theme.colors.mainHover}
  }
`;
