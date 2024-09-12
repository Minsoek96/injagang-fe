import { styled } from 'styled-components';

import { BRAND } from '@/src/shared/const';

import { styleMixin, V } from '@/src/shared/styles';
import { BrandLogo, UserMenu } from './components';
import { NavMenuList } from '../../shared/ui/nav';

import { navList } from './data';

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
  top: 0;
  ${styleMixin.Flex()}
  width: 100%;
  height: 6.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 0.15em solid ${(props) => props.theme.colors.mainLine};

  svg {
    font-size: 3.5rem;
    color: ${({ theme }) => theme.colors.svgColor};
  }
`;

const Wrapper = styled.div`
  ${styleMixin.Flex('space-between')}
  flex: 1;
  height: 100%;
  max-width: 100rem;

  @media screen and (max-width: ${V.mediaTablet}) {
    > a:first-child {
      display: none;
    }
    justify-content: center;
  }
`;
