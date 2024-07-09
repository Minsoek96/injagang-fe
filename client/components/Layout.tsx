import { ReactNode } from 'react';

import styled from 'styled-components';

import RenderToast from '@/components/toast/RenderToast';
import ReatQueryProvider from '@/services/ReatQueryProvider';
import NavBar from './Nav/NavBar';
import StyledProvider from './StyledProvider';
import PageHead from './PageHead';
import RenderModal from './modal/RenderModal';

interface LayoutProps {
  children: ReactNode;
}

/** 페이지 레이아웃  */
function Layout({ children }: LayoutProps) {
  return (
    <StyledProvider>
      <PageHead />
      <ReatQueryProvider>
        <LayoutContainer>
          <NavBar />
          <Content>{children}</Content>
        </LayoutContainer>
      </ReatQueryProvider>
      <RenderToast />
      <RenderModal />
    </StyledProvider>
  );
}

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  margin: 4rem auto;
  width: 80%;
  min-width: 0;
`;
