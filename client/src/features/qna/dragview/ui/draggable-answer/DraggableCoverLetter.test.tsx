import { render, screen } from '@testing-library/react';

import { emptySelectedText, sampleSelectedText } from '@/fixutures/entities/qnaboard';
import TestProvider from '@/fixutures/TestProvider';
import DraggableCoverLetter from './DraggableCoverLetter';

const context = describe;

describe('DraggableCoverLetter', () => {
  const testList = {
    question: 'test_question',
    answer: 'test_answer',
    qnaId: 10001,
  };
  const mockSelect = jest.fn();
  const mockRemove = jest.fn();

  const renderComponent = (isSelected: boolean) => {
    render(
      <TestProvider>
        <DraggableCoverLetter
          list={testList}
          onSelect={mockSelect}
          onRemove={mockRemove}
          selectedText={isSelected ? sampleSelectedText : emptySelectedText}
        />
      </TestProvider>,
    );
  };

  it('질문이 렌더링 된다.', () => {
    renderComponent(true);
    const searchQuestion = screen.getByText(testList.question);
    expect(searchQuestion).toBeInTheDocument();
  });

  context('선택된 문장이 있는 경우', () => {
    it('선택된 문장이 렌더링 된다.', () => {
      renderComponent(true);
      const searchAnswer = screen.getByText(/answer/i);
      expect(searchAnswer).toBeInTheDocument();
    });
    it('답변의 일부가 구간을 나누어 렌더링 된다.', () => {
      renderComponent(true);
      const startText = testList.answer.substring(0, sampleSelectedText.start);
      const searchStartText = screen.queryByText(startText);
      expect(searchStartText).toBeInTheDocument();
    });
  });

  context('선택된 문장이 없는 경우', () => {
    it('답변의 전체가 렌더링된다.', () => {
      renderComponent(false);
      const searchAnswer = screen.queryByText(testList.answer);
      expect(searchAnswer).toBeInTheDocument();
    });
  });
});
