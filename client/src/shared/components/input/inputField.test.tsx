import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputField from './InputField';

const context = describe;

describe('InputField 컴포넌트', () => {
  const label = '테스트 라벨';
  const type = 'text';
  const name = 'testInput';
  const value = '';
  const handleChange = jest.fn();

  beforeEach(() => {
    render(
      <InputField
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />,
    );
  });

  context('컴포넌트가 렌더링될 때', () => {
    it('라벨과 입력 필드가 렌더링되어야 한다', () => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('초기 값이 올바르게 설정되어야 한다', () => {
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toHaveValue(value);
    });

    it('입력 필드의 타입이 올바르게 설정되어야 한다', () => {
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toHaveAttribute('type', type);
    });

    it('입력 필드의 name 속성이 올바르게 설정되어야 한다', () => {
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toHaveAttribute('name', name);
    });
  });

  context('입력 값이 변경될 때', () => {
    it('onChange 핸들러가 호출되어야 한다', () => {
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, { target: { value: '안녕하세요, 세계!' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });
});
