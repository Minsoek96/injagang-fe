import { InputHTMLAttributes, forwardRef } from 'react';

import styled from 'styled-components';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({
    label, type = 'text', name, value, onChange,
  }, ref) => (
    <InputFieldStyle>
      <Label htmlFor={name}>{label}</Label>
      <Input
        ref={ref}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        id={name}
      />
    </InputFieldStyle>
  ),
);
InputField.displayName = 'InputField';

export default InputField;

const InputFieldStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #333333;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  height: 3.5rem;
  padding: 0 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${(props) => props.theme.colors.signatureColor};
    outline: none;
  }
`;
