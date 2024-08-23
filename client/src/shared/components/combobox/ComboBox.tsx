import { useId } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface ControlMenuProps<T> {
  label?: string;
  hideLabel?: boolean;
  selectedItem: T;
  items: T[];
  itemToId: (item: T) => string;
  itemToText: (item: T) => string;
  onChange: (item: T | null) => void;
  placeholder?: string;
  sx?: CSSProperties;
  Size?: { width: string; height: string };
}

function ComboBox<T>({
  label = '옵션선택 : ',
  hideLabel = false,
  onChange,
  selectedItem,
  items,
  itemToId,
  itemToText,
  placeholder = 'Please select',
  Size = { width: '100%', height: '100%' },
  sx = {},
}: ControlMenuProps<T>) {
  const id = useId();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const selected = items.find((item) => itemToId(item) === value);
    onChange(selected ?? null);
  };

  return (
    <Container>
      <label htmlFor={id} className={hideLabel ? 'sr-only' : ''}>
        {label}
      </label>
      <MenuSelect
        id={id}
        $Size={Size}
        value={itemToId(selectedItem)}
        onChange={handleChange}
        style={sx}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {items.map((item) => (
          <option key={itemToId(item)} value={itemToId(item)}>
            {itemToText(item)}
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
  border: 0.1em solid ${({ theme }) => theme.colors.mainLine};
`;
