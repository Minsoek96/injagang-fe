import React, {
  createContext, useContext, ReactNode, useId,
} from 'react';

import styled from 'styled-components';

type RadioContextType<T> = {
  name: string;
  selectedValue: string;
  onChange: (value: T) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RadioContext = createContext<RadioContextType<any> | undefined>(undefined);

type Props<T> = {
  children: ReactNode;
  name: string;
  value: string;
  onChange: (value: T) => void;
};

/**
 * 라디오 인풋 그룹
 * @template T -라디오 값의 타입
 * @example
 * ```tsx
 * <RadioGroup name="colors" value={color} onChange={setColor}>
 *   <RadioGroup.Option value="red">빨강</RadioGroup.Option>
 *   <RadioGroup.Option value="green">초록</RadioGroup.Option>
 *   <RadioGroup.Option value="blue">파랑</RadioGroup.Option>
 * </RadioGroup>
 * ```
 */
function RadioGroup<T>({
  children, name, value, onChange,
}: Props<T>) {
  const contextValue = React.useMemo(
    () => ({ name, selectedValue: value, onChange }),
    [name, value, onChange],
  );

  return (
    <RadioContext.Provider value={contextValue}>
      <RadioWrapper>{children}</RadioWrapper>
    </RadioContext.Provider>
  );
}

function useRadioContext() {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error('Radio.Option must be used within a Radio component');
  }
  return context;
}

type OptionProps = {
  value: string;
  children: ReactNode;
  id?: string;
};

function Option({ value, children, id = '' }: OptionProps) {
  const { name, selectedValue, onChange } = useRadioContext();
  const uniqueId = useId();
  const optionId = id || uniqueId;

  return (
    <RadioOption>
      <input
        type="radio"
        id={optionId}
        name={name}
        checked={selectedValue === value}
        onChange={() => onChange(value)}
      />
      <label htmlFor={optionId}>{children}</label>
    </RadioOption>
  );
}

RadioGroup.Option = Option;

export default RadioGroup;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  input[type="radio"] {
    width: 2rem;
    height: 2rem;
  }

  label {
    font-size: 1.6rem;
  }
`;
