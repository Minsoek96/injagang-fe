import { styled } from 'styled-components';

import { V } from '@/src/shared/styles';
import NavMenuItem from './NavMenuItem';

import { MenuItemType } from './types';

type NavProps = {
  navList: MenuItemType[];
  isHome: boolean;
};

export default function NavMenuList({ navList, isHome }: NavProps) {
  if (!navList.length) {
    return <p>Empty</p>;
  }
  return (
    <Container>
      <Wrapper $isHome={isHome}>
        {navList.map((item) => (
          <NavMenuItem key={item.title} {...item} />
        ))}
      </Wrapper>
    </Container>
  );
}
const Container = styled.nav`
  height: inherit;

`;

const Wrapper = styled.ul<{ $isHome: boolean }>`
  display: flex;
  height: inherit;
  li:first-child {
    display: ${(props) => (props.$isHome ? 'none' : 'flex')};
  }
  @media screen and (max-width: ${V.mediaTablet}) {
    li:first-child {
      display: flex;
    }
  }
`;
