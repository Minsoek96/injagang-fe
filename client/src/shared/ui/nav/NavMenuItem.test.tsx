import { render, screen, fireEvent } from '@testing-library/react';

import { usePathname } from 'next/navigation';

import NavMenuItem from '@/src/shared/ui/nav/NavMenuItem';
import TestProvider from '@/fixutures/TestProvider';

import { defaultTheme } from '@/src/app/styles';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('NavMenuItem 컴포넌트', () => {
  const context = describe;
  const mockTitle = 'testTitle';
  const mockPath = '/test';

  function MockIcon() {
    return <svg data-testid="mock-icon" />;
  }

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue(mockPath);
  });

  const renderNavMenuItem = (path = mockPath) => render(
    <TestProvider>
      <NavMenuItem title={mockTitle} path={path} icon={<MockIcon />} />
    </TestProvider>,
  );

  describe('기본 렌더링', () => {
    context('아이템이 렌더링될 때', () => {
      it('아이콘과 제목이 화면에 보여야 한다.', () => {
        renderNavMenuItem();

        const icon = screen.getByTestId('mock-icon');
        const title = screen.getByText(mockTitle);

        expect(icon).toBeInTheDocument();
        expect(title).toBeInTheDocument();
      });
    });
  });

  describe('선택된 상태', () => {
    context('현재 경로와 아이템의 경로가 일치할 때', () => {
      it('아이템의 테두리 색상과 아이콘 색상이 올바르게 설정되어야 한다.', () => {
        renderNavMenuItem();

        const container = screen.getByText(mockTitle).closest('li');
        expect(container).toHaveStyle(`border-bottom: 1px solid ${defaultTheme.colors.svgOnColor}`);
        expect(screen.getByTestId('mock-icon')).toHaveStyle(`fill: ${defaultTheme.colors.svgOnColor}`);
      });
    });
  });

  describe('호버 효과', () => {
    context('아이템에 마우스를 올릴 때', () => {
      it('제목이 보이도록 해야 한다.', () => {
        renderNavMenuItem();

        const container = screen.getByText(mockTitle).closest('li');
        const titleSpan = screen.getByText(mockTitle).closest('span');
        if (container) {
          fireEvent.mouseOver(container);
          expect(titleSpan).toBeVisible();
        } else {
          throw new Error('Container is null');
        }
      });
    });
  });

  describe('비선택 상태', () => {
    context('현재 경로와 아이템의 경로가 일치하지 않을 때', () => {
      it('아이템의 테두리와 아이콘 색상이 기본 색상으로 설정되어야 한다.', () => {
        (usePathname as jest.Mock).mockReturnValue('/other-path');
        renderNavMenuItem();

        const container = screen.getByText(mockTitle).closest('li');
        expect(container).toHaveStyle('border-bottom: none');
        expect(screen.getByTestId('mock-icon')).toHaveStyle(`fill: ${defaultTheme.colors.svgColor}`);
      });
    });
  });
});
