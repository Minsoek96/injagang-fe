import { Suspense, useEffect } from 'react';

import styled from 'styled-components';

import { ResizableSplitPanel } from '@/src/widgets/resize-panel';

import { CoverLetterListViewer } from '@/src/features/coverletter/preview';
import { CoverLetterDetailLayout } from '@/src/features/coverletter/detail';

import { useCoverLetterStore } from '@/src/entities/coverLetter';
import { useAuthStore } from '@/src/entities/auth';

import { Container, ErrorBoundary, Spinner } from '@/src/shared/ui';

import { Header, CoverLetterErrorFallback } from './ui';

function CoverLetterPage() {
  const role = useAuthStore((state) => state.role);
  const initCoverLetter = useCoverLetterStore((state) => state.initCoverLetter);

  const headerTitle = '나의 자소설';

  useEffect(
    () => () => {
      initCoverLetter();
    },
    [],
  );

  return (
    <CoverLetterStyle>
      {role && (
        <>
          <Header title={headerTitle} />
          <ResizableSplitPanel>
            <CoverLetterContainer>
              <ResizableSplitPanel.LeftPanel>
                <ErrorBoundary
                  renderFallback={(error, onReset) => (
                    <CoverLetterErrorFallback
                      onReset={onReset}
                      message={{
                        title: '앗! 자소설 조회에 실패했어요.😅',
                        subTitle:
                          '일시적인 오류일 수 있으니 다시 시도해 주세요',
                      }}
                    />
                  )}
                >
                  <Suspense
                    fallback={
                      <Spinner message="당신의 자소설을 가져오는 중 입니다." />
                    }
                  >
                    {/* 메인 컴포넌트 */}
                    <CoverLetterListViewer />
                  </Suspense>
                </ErrorBoundary>
              </ResizableSplitPanel.LeftPanel>

              <ResizableSplitPanel.Center />

              <ResizableSplitPanel.RightPanel>
                <ErrorBoundary
                  renderFallback={(error, onReset) => (
                    <CoverLetterErrorFallback
                      onReset={onReset}
                      message={{
                        title: '앗! 당신의 인생의 페이지 조회에 실패했어요.😅',
                        subTitle:
                          '일시적인 오류일 수 있으니 다시 시도해 주세요',
                      }}
                    />
                  )}
                >
                  <Suspense
                    fallback={
                      <Spinner message="당신의 페이지를 가져오는 중 입니다." />
                    }
                  >
                    {/* 메인 컴포넌트 */}
                    <CoverLetterDetailLayout />
                  </Suspense>
                </ErrorBoundary>
              </ResizableSplitPanel.RightPanel>
            </CoverLetterContainer>
          </ResizableSplitPanel>
        </>
      )}
    </CoverLetterStyle>
  );
}

export default CoverLetterPage;

const CoverLetterStyle = styled.div`
  width: 100%;
`;

const CoverLetterContainer = styled(Container.ItemBase)`
  display: flex;
  width: 100%;
  color: ${(props) => props.theme.colors.text};
  height: 65rem;
`;
