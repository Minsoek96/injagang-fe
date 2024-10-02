import { fireEvent, render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import ResizeableTextarea from './ResizeableTextarea';

const mockRegister = {
  name: 'test-area',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn(),
};

describe('ResizableTextarea', () => {
  const renderCompoent = () => {
    render(
      <TestProvider>
        <ResizeableTextarea maxSize={30} register={mockRegister} placeholder="test-area" />
      </TestProvider>,
    );
  };
  it('값을 입력하면 값이 변한다.', () => {
    renderCompoent();
    const searchTextArea = screen.getByPlaceholderText('test-area');
    expect(searchTextArea).toBeInTheDocument();
    fireEvent.change(searchTextArea, {
      target: { value: 'new value' },
    });
    expect(searchTextArea).toHaveValue('new value');
  });

  it('값을 입력하면 높이가 변한다.', () => {
    renderCompoent();
    const textArea = screen.getByPlaceholderText('test-area');

    const setHeightSpy = jest.spyOn(textArea.style, 'height', 'set');

    fireEvent.input(textArea, {
      target: { value: 'new value' },
    });

    expect(setHeightSpy).toHaveBeenCalled();
  });
});
