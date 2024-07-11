import { styled } from 'styled-components';
import { BRAND } from '@/constants';
import NavMenuList from '@/components/nav/NavMenuList';
import { navList } from './data';
import UserMenu from './UserMenu';
import BrandLogo from './BrandLogo';

export default function Header() {
  return (
    <HeaderContainer>
      <Wrapper>
        <BrandLogo title={BRAND.title} path="/" />
        <NavMenuList navList={navList} />
        <UserMenu />
      </Wrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
 z-index: 9999;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 8rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-right: 0.5px solid rgba(236, 225, 225, 0.904);
  border-bottom: 0.15em solid ${(props) => props.theme.colors.mainLine};

  svg {
    font-size: 3.5rem;
    color: ${({ theme }) => theme.colors.svgColor};
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  height: 100%;
  max-width: 100rem;

  @media screen and (max-width: 1200px) {
    > a:first-child {
      display: none;
    }
    justify-content: center;
  }
`;
