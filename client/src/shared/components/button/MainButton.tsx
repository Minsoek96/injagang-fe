import { BaseProps } from '@/src/shared/components/button/type';
import { V } from '@/src/shared/styles';
import styled from 'styled-components';

export default function MainButton({
  onAction,
  label,
  sx = {},
}: BaseProps) {
  return (
    <CustomBtn onClick={onAction} style={sx}>
      {label}
    </CustomBtn>
  );
}

const CustomBtn = styled.button.attrs({
  type: 'button',
  role: 'button',
})`
  background-color: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  padding: ${V.smPadding};
  border-radius: 1rem;
  font-weight: bold;
  box-shadow: 0 1.5px 2px rgba(0, 0, 0, 09);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #777;
  }

  &:active {
    background-color: red;
  }

  &.active_button {
    background-color: red;
  }
`;
