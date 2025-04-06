import TestProvider from '@/fixutures/TestProvider';

import { fireEvent, render, screen } from '@testing-library/react';

import RecordNavigation from './RecordNavigation';

const context = describe;

describe('RecordNavigation', () => {
  const mockDecrease = jest.fn();
  const mockIncrease = jest.fn();

  const defaultProps = {
    onCounterDecrease: mockDecrease,
    onCounterIncrease: mockIncrease,
    counter: 0,
    questionProgress: '1/5 (1회차)',
    lastVideo: 4,
  };

  const renderComponent = (props = {}) => {
    render(
      <TestProvider>
        <RecordNavigation {...defaultProps} {...props} />
      </TestProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('렌더링 테스트', () => {
    it('진행현황이 표시된다', () => {
      renderComponent();
      expect(screen.getByText('진행현황:')).toBeInTheDocument();
      expect(screen.getByText('1/5 (1회차)')).toBeInTheDocument();
    });

    it('이전/다음 버튼이 렌더링된다', () => {
      renderComponent();
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });
  });

  context('질문 인덱스 표시', () => {
    it('첫 번째 사이클의 질문 번호가 표시된다', () => {
      renderComponent({ counter: 2, questionProgress: '3/5 (1회차)' });
      expect(screen.getByText('3/5 (1회차)')).toBeInTheDocument();
    });

    it('두 번째 사이클의 질문 번호가 표시된다', () => {
      renderComponent({ counter: 7, questionProgress: '3/5 (2회차)' });
      expect(screen.getByText('3/5 (2회차)')).toBeInTheDocument();
    });

    it('세 번째 사이클의 질문 번호가 표시된다', () => {
      renderComponent({ counter: 12, questionProgress: '3/5 (3회차)' });
      expect(screen.getByText('3/5 (3회차)')).toBeInTheDocument();
    });
  });

  context('버튼 활성화 상태', () => {
    it('첫 번째 질문에서는 두 버튼이 비활성화된다', () => {
      renderComponent({ counter: 0 });

      const buttons = screen.getAllByRole('button');
      const prevButton = buttons[0];

      expect(prevButton).toBeDisabled();
    });

    it('마지막 질문에서는 다음 버튼이 비활성화된다', () => {
      renderComponent({ counter: 4, lastVideo: 4 });

      const buttons = screen.getAllByRole('button');
      const nextButton = buttons[1];

      expect(nextButton).toBeDisabled();
    });

    it('중간 질문에서는 두 버튼 모두 활성화된다', () => {
      renderComponent({ counter: 2, lastVideo: 4 });

      const buttons = screen.getAllByRole('button');
      const prevButton = buttons[0];
      const nextButton = buttons[1];

      expect(prevButton).not.toBeDisabled();
      expect(nextButton).not.toBeDisabled();
    });
  });

  context('버튼 이벤트', () => {
    it('이전 버튼 클릭 시 onCounterDecrease가 호출된다', () => {
      renderComponent({ counter: 1 });

      const buttons = screen.getAllByRole('button');
      const prevButton = buttons[0];

      fireEvent.click(prevButton);
      expect(mockDecrease).toHaveBeenCalledTimes(1);
    });

    it('다음 버튼 클릭 시 onCounterIncrease가 호출된다', () => {
      renderComponent({ counter: 3 });

      const buttons = screen.getAllByRole('button');
      const nextButton = buttons[1];

      fireEvent.click(nextButton);
      expect(mockIncrease).toHaveBeenCalledTimes(1);
    });
  });
});
