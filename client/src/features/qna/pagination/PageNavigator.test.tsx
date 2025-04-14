import { fireEvent, render, screen } from '@testing-library/react';
import TestProvider from '@/fixutures/TestProvider';

import PageNavigator from './PageNavigator';

const context = describe;
describe('PageNavigator', () => {
  const renderComponent = (pageLimit: number = 8, totalPage: number = 20) => {
    render(
      <TestProvider>
        <PageNavigator pageLimit={pageLimit} totalPage={totalPage} />
      </TestProvider>,
    );
  };

  const mockCurrentGroupLastPage = () => {
    const pages = screen.getAllByRole('button');
    const lastNum = pages[pages.length - 2].textContent;
    fireEvent.click(screen.getByRole('button', { name: String(lastNum) }));
  };

  const mockNextPage = () => {
    fireEvent.click(screen.getByRole('button', { name: '>' }));
  };

  const mockPrevPage = () => {
    fireEvent.click(screen.getByRole('button', { name: '<' }));
  };

  context('초기 렌더링', () => {
    it('페이지 네비게이션 버튼을 렌더링한다.', () => {
      renderComponent();
      const prevButton = screen.getByText('<');
      const nextButton = screen.getByText('>');
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('8개의 버튼이 렌더링 된다.', () => {
      renderComponent();
      for (let i = 1; i <= 8; i += 1) {
        const pageButton = screen.getByText(i.toString());
        expect(pageButton).toBeInTheDocument();
      }
      const pageButtons = screen
        .getAllByRole('button')
        .filter(
          (button) => button.textContent !== '<' && button.textContent !== '>',
        );
      expect(pageButtons).toHaveLength(8);
    });
  });

  context('사용자 반응', () => {
    it('그룹내 마지막 페이지에서 ">" 클릭하면 다음 그룹이 렌더링 된다.', () => {
      renderComponent();
      mockCurrentGroupLastPage();
      mockNextPage();
      for (let i = 9; i <= 16; i += 1) {
        const pageButton = screen.getByText(i.toString());
        expect(pageButton).toBeInTheDocument();
      }
    });

    it('첫번째 그룹에서 첫 페이지에서 "<" 클릭하면 이전 그룹이 렌더링 된다.', () => {
      renderComponent();
      mockCurrentGroupLastPage();
      mockNextPage();
      mockPrevPage();
      for (let i = 1; i <= 8; i += 1) {
        const pageButton = screen.getByText(i.toString());
        expect(pageButton).toBeInTheDocument();
      }
    });

    it('첫 페이지인 경우 "<"는 disabled 이다.', () => {
      renderComponent();
      const prevButton = screen.getByRole('button', {
        name: '<',
      });
      expect(prevButton).toBeDisabled();
    });

    it('첫 페이지가 아니면 "<" disabled가 아니다.', () => {
      renderComponent();
      const prevButton = screen.getByRole('button', {
        name: '<',
      });
      mockNextPage();
      expect(prevButton).not.toBeDisabled();
    });

    it('라스트 페이지는 ">" disabled이다.', () => {
      renderComponent(8, 8);
      mockCurrentGroupLastPage();
      const nextButton = screen.getByRole('button', {
        name: '>',
      });
      expect(nextButton).toBeDisabled();
    });
  });
});
