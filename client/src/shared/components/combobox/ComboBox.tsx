import { keys } from '@/src/shared/utils';
import { useId } from 'react';
import styled from 'styled-components';

interface SelectProps {
  $Size: {
    width: string;
    height: string;
  };
}

const MenuSelect = styled.select<SelectProps>`
  width: ${({ $Size }) => $Size.width || '100%'};
  height: ${({ $Size }) => $Size.height || '100%'};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
`;

interface ControlMenuProps {
  value: string;
  onChange: (
    selected: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;
  optionList: { title: string }[];
  Size: { width: string; height: string };
}

function ComboBox({
  value, onChange, optionList, Size,
}: ControlMenuProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        옵션 선택 :
      </label>
      <MenuSelect
        id={id}
        $Size={Size}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
    </div>
  );
}

export default ComboBox;
