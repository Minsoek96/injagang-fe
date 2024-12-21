import TestProvider from '@/fixutures/TestProvider';
import DraggedAnswer from '@/src/features/qna/dragview/DraggedAnswer';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

const context = describe;
describe('DraggedAnswer', () => {
  const startText = 'startWord';
  const selectedText = 'selectedWord';
  const endText = 'endWord';
  const mockRemove = jest.fn();

  const renderComponent = () => {
    render(
      <TestProvider>
        <DraggedAnswer
          startText={startText}
          selectedText={selectedText}
          endText={endText}
          onRemove={mockRemove}
        />
      </TestProvider>,
    );
  };

  context('문장 테스트', () => {
    it('시작 단어가 렌더링된다.', () => {
      renderComponent();
      const searchStart = screen.getByText(new RegExp(startText));
      expect(searchStart).toBeInTheDocument();
    });

    it('선택 단어가 렌더링된다.', () => {
      renderComponent();
      const searchSelected = screen.getByText(new RegExp(selectedText));
      expect(searchSelected).toBeInTheDocument();
    });

    it('선택단어는 하이라이트 효과를 낸다.', () => {
      renderComponent();
      const searchSelected = screen.getByText(new RegExp(selectedText));
      expect(searchSelected).toHaveStyle('background: #0f766d80');
    });

    it('끝 단어가 렌더링된다.', () => {
      renderComponent();
      const searchEnd = screen.getByText(new RegExp(endText));
      expect(searchEnd).toBeInTheDocument();
    });
  });

  it('선택 단어를 클릭하면 mockRemove가 호출된다.', async () => {
    renderComponent();
    const searchSelected = screen.getByText(new RegExp(selectedText));
    fireEvent.click(searchSelected);
    await waitFor(() => {
      expect(mockRemove).toHaveBeenCalled();
    });
  });
});
