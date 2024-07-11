import { styled } from 'styled-components';

import NavMenuItem from './NavMenuItem';

import { MenuItemType } from './types';

type NavProps = {
  navList: MenuItemType[];
};

export default function NavMenuList({ navList = [] }: NavProps) {
  if (!navList.length) {
    return <p>Empty</p>;
  }
  return (
    <Container>
      {navList.map(({ title, path, icon }) => (
        <NavMenuItem key={title} title={title} path={path} icon={icon} />
      ))}
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  height: inherit;
  @media screen and (max-width: 1200px) {
  }
`;
