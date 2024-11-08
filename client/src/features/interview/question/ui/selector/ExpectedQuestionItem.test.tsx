import { fireEvent, render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import ExpectedQuestionItem from '@/src/features/interview-question/expected-question/ExpectedQuestionItem';

const context = describe;

describe('ExpectedQuestionItem', () => {
  const mockChange = jest.fn();
  const question = '테스트 질문 내용';
  const mockId = 10001;
  const renderComponent = (isChecked: boolean) => {
    render(
      <TestProvider>
        <ExpectedQuestionItem
          onChange={mockChange}
          question={question}
          id={mockId}
          isChecked={isChecked}
        />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('체크의 상태가 true라면', () => {
    it('클릭시 반전된 상태인 false가 전달된다.', () => {
      renderComponent(true);
      const item = screen.getByRole('listitem');
      expect(item).toBeInTheDocument();

      fireEvent.click(item);
      expect(mockChange).toHaveBeenCalledWith(mockId, false);
    });

    it('아이템의 opacity가 0.5이다.', () => {
      renderComponent(true);
      const item = screen.getByRole('listitem');
      expect(item).toHaveStyleRule('opacity', '0.5');
    });
  });

  context('체크의 상태가 false라면', () => {
    it('클릭시 반전된 상태인 true가 전달된다.', () => {
      renderComponent(false);
      const item = screen.getByRole('listitem');
      expect(item).toBeInTheDocument();

      fireEvent.click(item);
      expect(mockChange).toHaveBeenCalledWith(mockId, true);
    });

    it('아이템의 opacity가 1이다.', () => {
      renderComponent(false);
      const item = screen.getByRole('listitem');
      expect(item).toHaveStyleRule('opacity', '1');
    });
  });
});
