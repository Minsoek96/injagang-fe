import { InputHTMLAttributes, useId } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  sx?: CSSProperties;
}

export default function CheckBox({
  label,
  sx = {},
  checked,
  onChange,
  ...rest
}: Props) {
  const uniqueId = useId();

  return (
    <>
      <StyledCheckbox
        id={uniqueId}
        role="checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={sx}
        {...rest}
      />
      {label && <StyledLabel htmlFor={uniqueId}>{label}</StyledLabel>}
    </>
  );
}

interface CheckBoxProps {
  $isActive?: boolean;
}

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })<CheckBoxProps>`
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 1.8rem;
  height: 1.8rem;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  outline: none;
  transition: all 150ms;
  position: relative;
  vertical-align: middle;

  &:checked {
    background-color: ${(props) => props.theme.colors.signatureColor};
    border-color: ${(props) => props.theme.colors.signatureColor};
  }

  &:checked::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    top: 1px;
    left: 5px;
    transform: rotate(45deg);
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.signatureHover};
  }

  &:checked:hover {
    background-color:  ${(props) => props.theme.colors.signatureHover};
    border-color:  ${(props) => props.theme.colors.signatureHover};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const StyledLabel = styled.label`
  margin-left: 8px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
`;
