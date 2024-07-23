import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import DropMenuItem from '@/src/shared/components/dropbox/DropMenuItem';

function MockIcon() {
  return <svg data-testid="mock-icon" />;
}

function MockCompoent() {
  return <div>컴포넌트</div>;
}

describe('DropMenuItem 컴포넌트', () => {
  const context = describe;

  context('컴포넌트 렌더링될 때 type이 link 라면', () => {
    it('링크 아이템을 렌더링한다.', () => {
      render(
        <TestProvider>
          <DropMenuItem
            menuItem={{
              id: 'drop-02',
              type: 'link',
              link: {
                path: '/test-path',
                label: 'Test Label',
                icon: <MockIcon />,
                title: 'Test Title',
              },
            }}
          />
        </TestProvider>,
      );

      const link = screen.getByRole('link', { name: 'Test Label' });
      const title = screen.getByText('Test Title');
      const icon = screen.getByTestId('mock-icon');

      expect(link).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
  });

  context('컴포넌트 렌더링될 때 type이 component 라면', () => {
    it('컴포넌트를 렌더링한다.', () => {
      render(
        <TestProvider>
          <DropMenuItem
            menuItem={{
              id: 'drop-03',
              type: 'component',
              component: <MockCompoent />,
            }}
          />
        </TestProvider>,
      );

      const isComponent = screen.getByText('컴포넌트');
      const icon = screen.queryByTestId('mock-icon');
      expect(icon).not.toBeInTheDocument();
      expect(isComponent).toBeInTheDocument();
    });
  });
});
