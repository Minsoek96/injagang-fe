import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import { sampleResponseQuestions } from '@/fixutures/entities/intervew_question';

import { interviewQueries } from '@/src/entities/interview_question';

import ExpectedQuestionSelector from './ExpectedQuestionSelector';

jest.mock('@/src/entities/interview_question', () => {
  const actualHooks = jest.requireActual('@/src/entities/interview_question');
  return {
    ...actualHooks,
    interviewQueries: {
      useFetchQuestions: jest.fn(),
    },
  };
});

const mockQuestionTypeSelector = jest.fn();

// QuestionTypeSelector 모킹
jest.mock('./question-type-selector', () => ({
  QuestionTypeSelector: () => mockQuestionTypeSelector(),
}));

const context = describe;
describe('ExpectedQuestionSelector', () => {
  const renderComponent = () => render(
    <TestProvider>
      <ExpectedQuestionSelector />
    </TestProvider>,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    (interviewQueries.useFetchQuestions as jest.Mock).mockReturnValue({
      data: sampleResponseQuestions,
    });
  });

  context('컴포넌트 렌더링 테스트', () => {
    beforeEach(() => {
      mockQuestionTypeSelector.mockImplementation(() =>
        <p>Please select</p>);
    });
    it('헤더가 렌더링 된다.', () => {
      renderComponent();
      expect(screen.getByText('Questions by Type')).toBeInTheDocument();
    });

    it('타입 선택 컴포넌트가 렌더링 된다.', () => {
      renderComponent();
      expect(screen.getByText(/Please select/)).toBeInTheDocument();
    });

    it('두개의 액션 버튼이 렌더링 된다.', () => {
      renderComponent();
      expect(screen.queryAllByRole('button')).toHaveLength(2);
    });
  });

  context('사용자가 질문타입을 변경하면', () => {
    it('질문 리스트가 렌더링 된다.', () => {
      renderComponent();
      sampleResponseQuestions.forEach((item) => {
        expect(screen.queryByText(item.questions)).toBeInTheDocument();
      });
    });
  });

  context('자식 컴포넌트의 예상치 못한 오류가 발생한 경우', () => {
    beforeEach(() => {
      mockQuestionTypeSelector.mockImplementation(() => {
        throw new Error('테스트 에러');
      });
    });
    it('에러 안내 메시지가 렌더링 된다.', () => {
      renderComponent();

      expect(screen.getByText('잠시만요!')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /다시 시도/ })).toBeInTheDocument();
    });
  });
});
