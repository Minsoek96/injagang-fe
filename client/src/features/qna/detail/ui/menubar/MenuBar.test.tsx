import { fireEvent, render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import MenuBar from './MenuBar';

const context = describe;

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
  replace: jest.fn(),
}));

describe('MenuBar', () => {
  const mockBoardId = 1001;
  const mockContent = 'Test-Content';
  const mockTitle = 'Test-Title';

  const renderComponent = () => {
    render(
      <TestProvider>
        <MenuBar boardId={mockBoardId} title={mockTitle} content={mockContent} />
      </TestProvider>,
    );
  };

  const clickElement = (label: string) => {
    const element = screen.getByText(label);
    fireEvent.click(element);
  };

  context('사용자가 메뉴를 클릭하는 경우', () => {
    it('초기 라벨은 ON이다.', () => {
      renderComponent();
      const onElement = screen.getByText('ON');
      expect(onElement).toBeInTheDocument();

      const offElement = screen.queryByText('OFF');
      expect(offElement).not.toBeInTheDocument();
    });

    it('ON 상태에서 클릭하면 OFF가 된다.', () => {
      renderComponent();
      clickElement('ON');
      const offElement = screen.getByText('OFF');
      expect(offElement).toBeInTheDocument();
    });
  });

  context('메뉴 렌더링 테스트', () => {
    it('ON 상태에서 삭제 메뉴가 보인다.', () => {
      renderComponent();
      clickElement('ON');

      const deleteMenu = screen.getByText('삭제');
      expect(deleteMenu).toBeInTheDocument();
    });

    it('ON 상태에서 수정 메뉴가 렌더링 된다.', () => {
      renderComponent();
      clickElement('ON');

      const editMenu = screen.getByText('수정');
      expect(editMenu).toBeInTheDocument();
    });
  });
});
