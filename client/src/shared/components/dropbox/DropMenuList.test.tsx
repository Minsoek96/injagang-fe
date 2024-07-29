import { sampleDropList } from '@/fixutures/shared';

import TestProvider from '@/fixutures/TestProvider';
import DropMenuList from '@/src/shared/components/dropbox/DropMenuList';

import { render, screen } from '@testing-library/react';

describe('DropMenuList 컴포넌트', () => {
  const context = describe;
  const mockAction = jest.fn();

  context('리스트가 비어있으면', () => {
    it('Empty가 출력된다.', () => {
      render(
        <TestProvider>
          <DropMenuList dropList={[]} offBox={mockAction} />
        </TestProvider>,
      );

      const isEmpty = screen.getByText('Empty');
      expect(isEmpty).toBeInTheDocument();
    });
  });

  context('리스트가 존재하면', () => {
    it('리스트 아이템이 렌더링 된다.', () => {
      render(
        <TestProvider>
          <DropMenuList dropList={sampleDropList} offBox={mockAction} />
        </TestProvider>,
      );

      const findLi = screen.getAllByRole('listitem');
      expect(findLi).toHaveLength(3);
    });
  });
});
