import { keys } from '@/src/shared/utils';
import styled from 'styled-components';
// import { QuestionType } from "../redux/InterViewQuestion/action";

interface SelectProps {
  $Size: {
    width: string;
    height: string;
  };
}

const ControlMenuSelect = styled.select<SelectProps>`
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

function ControlMenu({
  value, onChange, optionList, Size,
}: ControlMenuProps) {
  return (
    <div>
      <label htmlFor="controlMenuSelect" className="sr-only">
        옵션 선택 :
      </label>
      <ControlMenuSelect
        id="controlMenuSelect"
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
      </ControlMenuSelect>
    </div>
  );
}

export default ControlMenu;
