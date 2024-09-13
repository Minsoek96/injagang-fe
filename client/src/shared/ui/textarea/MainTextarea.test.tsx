import {
  fireEvent, render, screen,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import MainTextarea from './MainTextarea';

describe('MainTextarea', () => {
  let initialText = '';
  const context = describe;
  const placeHolderText = '텍스트를입력하세요.';

  const mockSetText = jest.fn((text:string) => {
    initialText = text;
  });

  const renderResizeableTextarea = () => render(
    <TestProvider>
      <MainTextarea
        text={initialText}
        setText={mockSetText}
        placeholder={placeHolderText}
      />
    </TestProvider>,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('컴포넌트가 마운트될 때', () => {
    it('초기 텍스트와 placeholder가 올바르게 표시된다.', () => {
      renderResizeableTextarea();
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveValue(initialText);
    });
  });

  context('텍스트를 입력하면', () => {
    it('텍스트가 변한다.', () => {
      renderResizeableTextarea();

      const textarea = screen.getByPlaceholderText(placeHolderText) as HTMLTextAreaElement;
      const newText = '텍스트가 변경되어야 한다.';

      fireEvent.change(textarea, { target: { value: newText.repeat(5) } });

      expect(mockSetText).toHaveBeenCalledWith(newText.repeat(5));
    });
  });
});
