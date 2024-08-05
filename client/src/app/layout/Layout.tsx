import { ReactNode } from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

import { Header } from '@/src/widgets';

import AuthProvider from '@/src/app/providers/AuthProvider';
import { RenderToast, RenderModal, HeadMeta } from '../components';

import { ReactQueryProvider, StyledProvider } from '../providers';

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
        <AuthProvider>
          <LayoutContainer>
            {!isBlockPath && <Header />}
            <MainContent>{children}</MainContent>
          </LayoutContainer>
        </AuthProvider>
        <RenderToast />
        <RenderModal />
      </ReactQueryProvider>
    </StyledProvider>
  );
}

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;

`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 135rem;
  padding: 3rem;
  margin: 0 auto;
  margin-top: 6.5rem;
`;
