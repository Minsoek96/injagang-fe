import { ReactNode } from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

import { RenderToast, RenderModal, HeadMeta } from '../components';

import { ReactQueryProvider, StyledProvider } from '../providers';

import { Header } from '../../widgets/header/index';

interface LayoutProps {
  children: ReactNode;
}

const headerBlockList = ['/login', '/join'];

/** 페이지 레이아웃  */
function Layout({ children }: LayoutProps) {
  const pathName = usePathname();
  const isBlockPath = headerBlockList.includes(pathName ?? '');

  return (
    <StyledProvider>
      <HeadMeta />
      <ReactQueryProvider>
        <LayoutContainer>
          {!isBlockPath && <Header />}
          <MainContent>{children}</MainContent>
        </LayoutContainer>
      </ReactQueryProvider>
      <RenderToast />
      <RenderModal />
    </StyledProvider>
  );
}

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  max-width: 135rem;
  margin: 10rem auto 0;
  padding: 2rem;
`;
