import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import { boardQueries } from '@/src/entities/qnaboard';
import QuestionDetailContent from './QuestionDetailContent';

const context = describe;

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
  replace: jest.fn(),
}));

jest.mock('@/src/entities/qnaboard', () => {
  const actualModule = jest.requireActual('@/src/entities/qnaboard');
  return {
    ...actualModule,
    boardQueries: {
      useFetchCurrentBoardDetail: jest.fn(),
    },
  };
});

describe('QuestionDetailView', () => {
  const mockTitle = 'Test-title';
  const mockContent = 'Test-Content';
  const mockNick = 'Tester';
  const mockId = 10001;

  const renderComponent = (owner: boolean) => {
    (boardQueries.useFetchCurrentBoardDetail as jest.Mock).mockReturnValue({
      data: {
        owner,
        title: mockTitle,
        content: mockContent,
        nickname: mockNick,
      },
      boardId: mockId,
      isLoading: false,
    });

    render(
      <TestProvider>
        <QuestionDetailContent />
      </TestProvider>,
    );
  };

  context('렌더링 테스트', () => {
    it('제목과 작성자가 렌더링 된다', () => {
      renderComponent(false);
      const searchTitle = screen.queryByText(mockTitle);
      const searchNick = screen.queryByText(mockNick);

      expect(searchTitle).toBeInTheDocument();
      expect(searchNick).toBeInTheDocument();
    });

    it('내용이 렌더링 된다', () => {
      renderComponent(false);
      const searchContent = screen.queryByText(mockContent);

      expect(searchContent).toBeInTheDocument();
    });
  });

  context('Owner 테스트 ', () => {
    it('true라면 메뉴에 접근할 수 있다.', () => {
      renderComponent(true);
      const searchOn = screen.queryByText('ON');
      expect(searchOn).toBeInTheDocument();
    });

    it('false라면 메뉴에 접근불가능 이다.', () => {
      renderComponent(false);
      const searchOn = screen.queryByText('ON');
      expect(searchOn).not.toBeInTheDocument();
    });
  });
});
