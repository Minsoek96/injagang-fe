import TestProvider from '@/fixutures/TestProvider';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import ResizeableTextarea from './ResizeableTextarea';
import '@testing-library/jest-dom/extend-expect';

describe('ResizeableTextarea', () => {
  let initialText = '';
  const context = describe;
  const placeHolderText = '텍스트를입력하세요.';

  const mockSetText = jest.fn((text:string) => {
    initialText = text;
  });

  const renderResizeableTextarea = () => render(
    <TestProvider>
      <ResizeableTextarea
        text={initialText}
        setText={mockSetText}
        placeholder={placeHolderText}
        maxSize={10}
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
      const newText = '높이가 조정되어야한다.높이가 조정되어야한다.';

      fireEvent.change(textarea, { target: { value: newText.repeat(5) } });

      expect(mockSetText).toHaveBeenCalledWith(newText.repeat(5));
    });
  });

  it('기본적으로 오버플로우가 숨겨져있다.', () => {
    renderResizeableTextarea();
    const textarea = screen.getByPlaceholderText(placeHolderText) as HTMLTextAreaElement;

    expect(textarea).toHaveStyle('overflow-y: hidden');
  });
});
