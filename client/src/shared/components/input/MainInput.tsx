import { ForwardedRef, forwardRef, useRef } from 'react';

import { CSSProperties, styled } from 'styled-components';

type Props = {
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  id?: string;
  sx?: CSSProperties;
};

const MainInput = forwardRef(
  (
    {
      placeholder = '', value, onChange, id = '', sx = {},
    }: Props,
    fwRef?: ForwardedRef<HTMLInputElement>,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const combinedRef = fwRef || internalRef;
    return (
      <Input
        ref={combinedRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id={id}
        style={sx}
      />
    );
  },
);

MainInput.displayName = 'MainInput';

MainInput.defaultProps = {
  placeholder: '',
  id: '',
  sx: {},
};

export default MainInput;

const Input = styled.input`
  height: 4rem;
  border-radius: 0.8rem;
  border: 0.1em solid ${(props) => props.theme.colors.mainLine};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  padding: 0.8em 0.16em;
`;
