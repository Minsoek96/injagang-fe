import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { boardQueries } from '@/src/entities/qnaboard';

import FeedbackComposer from './FeedbackComposer';

jest.mock('@/src/entities/qnaboard', () => {
  const actualModule = jest.requireActual('@/src/entities/qnaboard');
  return {
    ...actualModule,
    boardQueries: {
      useFetchCurrentBoardDetail: jest.fn(),
    },
  };
});

describe('FeedbackComposer', () => {
  const renderComponent = () => {
    (boardQueries.useFetchCurrentBoardDetail as jest.Mock).mockReturnValue({
      data: {
        qnaList: [10001, 10002, 10003],
      },
    });
    render(
      <TestProvider>
        <FeedbackComposer />
      </TestProvider>,
    );
  };

  it('첨삭 내용이 렌더링 된다.', () => {
    renderComponent();
    const searchCorrection = screen.getByText(/현재 선택된 문장/);
    expect(searchCorrection).toBeInTheDocument();
  });

  it('피드백 작성이 인풋이 렌더링 된다.', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText(/피드백을 작성해주세요/);
    expect(searchInput).toBeInTheDocument();
  });

  it('비우기와 작성 버튼이 렌더링된다.', () => {
    renderComponent();
    const searchClear = screen.getByRole('button', { name: '비우기' });
    const searchSubmit = screen.getByRole('button', { name: '작성' });
    expect(searchClear).toBeInTheDocument();
    expect(searchSubmit).toBeInTheDocument();
  });
});
