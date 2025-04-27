import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import NavMenuList from '@/src/shared/ui/nav/NavMenuList';

import { sampleNavList } from '@/fixutures/shared';

describe('NavMenuList 컴포넌트 ', () => {
  const renderNavList = (empty?:boolean) => {
    render(
      <TestProvider>
        <NavMenuList isHome={false} navList={empty ? [] : sampleNavList} />
      </TestProvider>,
    );
  };
  it('NavMennItem을 렌더링한다.', () => {
    renderNavList();
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(4);
  });

  it('sampleNavList의 값이 화면에 표시되어야 한다.', () => {
    renderNavList();

    sampleNavList.forEach((item) => {
      const getTitle = screen.getByText(item.title);
      expect(getTitle).toBeInTheDocument();
    });
  });

  it('sampleNavList의 값이 비어 있다면 empty가 출력된다.', () => {
    renderNavList(true);
    const empty = screen.queryByText('Empty');
    expect(empty).toBeInTheDocument();
  });
});
