import {
  fireEvent, render, screen,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import ResizeableTextarea from './ResizeableTextarea';

const mockRegister = {
  name: 'test-area',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn(),
};

describe('ResizableTextarea', () => {
  const renderCompoenent = () => {
    render(
      <TestProvider>
        <ResizeableTextarea
          maxSize={30}
          register={mockRegister}
          placeholder="test-area"
        />
      </TestProvider>,
    );
  };
  it('값을 입력하면 값이 변한다.', () => {
    renderCompoenent();
    const searchTextArea = screen.getByPlaceholderText('test-area');
    expect(searchTextArea).toBeInTheDocument();
    fireEvent.change(searchTextArea, {
      target: { value: 'new value' },
    });
    expect(searchTextArea).toHaveValue('new value');
  });

  it('값을 입력하면 높이가 변한다.', () => {
    renderCompoenent();
    const textArea = screen.getByPlaceholderText('test-area');

    const setHeightSpy = jest.spyOn(textArea.style, 'height', 'set');

    fireEvent.input(textArea, {
      target: { value: 'new value' },
    });

    expect(setHeightSpy).toHaveBeenCalled();
  });

  it('최소 높이보다 작은 내용 입력 시 최소 높이가 유지된다.', () => {
    renderCompoenent();
    const textarea = screen.getByPlaceholderText('test-area');

    Object.defineProperty(textarea, 'scrollHeight', {
      value: 30,
    });

    const setHeightSpy = jest.spyOn(textarea.style, 'height', 'set');

    fireEvent.input(textarea, {
      target: { value: 'mock-value' },
    });

    expect(setHeightSpy).toHaveBeenCalledTimes(2);
    expect(setHeightSpy).toHaveBeenLastCalledWith('50px');
  });
});
