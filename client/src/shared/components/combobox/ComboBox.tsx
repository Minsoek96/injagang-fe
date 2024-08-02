import { keys } from '@/src/shared/utils';
import { useId } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface ControlMenuProps {
  value: string;
  onChange: (
    selected: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;
  optionList: { title: string }[];
  sx?: CSSProperties;
  Size?: { width: string; height: string };
}

function ComboBox({
  value,
  onChange,
  optionList,
  Size = { width: '100%', height: '100%' },
  sx = {},
}: ControlMenuProps) {
  const id = useId();

  return (
    <Container>
      <label htmlFor={id} className="sr-only">
        옵션 선택 :
      </label>
      <MenuSelect
        id={id}
        $Size={Size}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={sx}
      >
        <option value="" disabled>
          Please select
        </option>
        {optionList.map((option, index) => (
          <option key={keys(option.title, index)} value={option.title}>
            {option.title}
          </option>
        ))}
      </MenuSelect>
    </Container>
  );
}

export default ComboBox;

interface SelectProps {
  $Size: {
    width: string;
    height: string;
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MenuSelect = styled.select<SelectProps>`
  width: ${({ $Size }) => $Size.width || '100%'};
  height: ${({ $Size }) => $Size.height || '100%'};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: .1em solid ${({ theme }) => theme.colors.mainLine}
`;
