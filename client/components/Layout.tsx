import { ReactNode } from 'react';

import styled from 'styled-components';

import { usePathname } from 'next/navigation';

import ReactQueryProvider from '@/services/ReactQueryProvider';
import RenderToast from '@/components/toast/RenderToast';
import StyledProvider from './StyledProvider';
import RenderModal from './modal/RenderModal';
import HeadMeta from './HeadMeta';
import Header from './header/Header';

interface LayoutProps {
  children: ReactNode;
}

const headerBlockList = ['/login', '/join'];

/** 페이지 레이아웃  */
function Layout({ children }: LayoutProps) {
  const pathName = usePathname();
  const isBlockPath = headerBlockList.includes(pathName);

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
