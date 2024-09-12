import { fireEvent, render, screen } from '@testing-library/react';

import MainInput from '@/src/shared/ui/input/MainInput';
import TestProvider from '@/fixutures/TestProvider';

describe('MainInput', () => {
  const placeHolder = '값을 입력해주세요..';
  const value = 'text';
  const changeMock = jest.fn();

  const renderInput = () => {
    render(
      <TestProvider>
        <MainInput
          placeholder={placeHolder}
          value={value}
          onChange={changeMock}
        />
        ,
      </TestProvider>,
    );
  };

  it('placeHolder를 렌더링한다.', () => {
    renderInput();
    const input = screen.getByPlaceholderText(placeHolder);
    expect(input).toBeInTheDocument();
  });

  it('값을 변경하면 새로운 값을 렌더링한다.', () => {
    renderInput();
    const input = screen.getByPlaceholderText(placeHolder);
    const newText = 'Test';
    fireEvent.change(input, { target: { value: newText } });
    expect(changeMock).toHaveBeenCalledWith(newText);
  });
});
