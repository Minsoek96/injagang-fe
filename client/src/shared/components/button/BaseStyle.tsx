import { styled } from 'styled-components';

interface SelectProps {
  $Size: {
    width: string;
    font: string;
  };
}

export const BaseButton = styled.button<SelectProps>`
  width: ${({ $Size }) => $Size.width || '100%'};
  background-color: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ $Size }) => $Size.font || '16px'};
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
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
