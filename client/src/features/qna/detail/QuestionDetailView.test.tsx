import { render, screen } from '@testing-library/react';

import QuestionDetailView from '@/src/features/qna/detail/QuestionDetailView';

import TestProvider from '@/fixutures/TestProvider';

const context = describe;

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
  replace: jest.fn(),
}));

describe('QuestionDetailView', () => {
  const mockTitle = 'Test-title';
  const mockContent = 'Test-Content';
  const mockNick = 'Tester';
  const mockId = 10001;

  const renderComponent = (owner: boolean) => {
    render(
      <TestProvider>
        <QuestionDetailView
          owner={owner}
          title={mockTitle}
          content={mockContent}
          boardId={mockId}
          nickname={mockNick}
        />
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
