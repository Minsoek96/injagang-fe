import TestProvider from '@/fixutures/TestProvider';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import DraggableAnswer from './DraggableAnswer';

describe('DraggableAnswer', () => {
  const mockSelect = jest.fn();
  const sampleAnswer = 'test-answer-test_answer';
  const renderComponent = () => {
    render(
      <TestProvider>
        <DraggableAnswer answer={sampleAnswer} onSelect={mockSelect} />
      </TestProvider>,
    );
  };

  it('질문이 렌더링된다.', () => {
    renderComponent();
    const searchQuestion = screen.getByText(sampleAnswer);
    expect(searchQuestion).toBeInTheDocument();
  });

  it('질문을 드래그하면 mockSelect가 호출된다.', async () => {
    renderComponent();
    const searchQuestion = screen.getByText(/answer-/);
    fireEvent.mouseUp(searchQuestion);
    await waitFor(() => {
      expect(mockSelect).toHaveBeenCalled();
    });
  });
});
