import { fireEvent, render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import DropBox from '@/src/shared/ui/dropbox/DropBox';

import { sampleDropList } from '@/fixutures/shared';

describe('DropBox 컴포넌트', () => {
  const context = describe;
  const renderDropBox = () => {
    render(
      <TestProvider>
        <DropBox buttonContent={<i />} dropList={sampleDropList} />
      </TestProvider>,
    );
  };

  context('메뉴 버튼을 클릭하면', () => {
    it('메뉴 리스트가 보인다.', () => {
      renderDropBox();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(screen.queryAllByRole('listitem')).toHaveLength(3);
    });
  });

  context('메뉴 버튼을 두번 클릭하면', () => {
    it('메뉴 리스트가 보였다 사라진다.', () => {
      renderDropBox();
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(screen.queryAllByRole('listitem')).toHaveLength(3);

      fireEvent.click(button);
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
  });
});
