import { CSSProperties, styled } from 'styled-components';

type Props = {
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  id?: string;
  sx?: CSSProperties;
};

export default function MainInput({
  placeholder = '',
  value,
  onChange,
  id = '',
  sx = {},
}: Props) {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      id={id}
      style={sx}
    />
  );
}

const Input = styled.input`
  height: 4rem;
  border-radius: 0.8rem;
  border: 0.1em solid ${(props) => props.theme.colors.mainLine};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  padding: 0.8em 0.16em;
`;
