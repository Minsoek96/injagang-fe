import { Suspense, useRef, useState } from 'react';

import styled from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';
import { Container, Spinner, ErrorBoundary } from '@/src/shared/ui';

import CoverLetterListFallback from '@/src/features/coverletter/preview/ui/coverletter-list/CoverLetterListFallback';

import { CoverLetterDetailLayout } from '@/src/features/coverletter/detail';
import { Header } from './coverletter-header';
import CoverLetterList from './coverletter-list/CoverLetterList';

/** 유저 자소서 선택 페이지
 *
 * TODOS
 * - 모바일 버전 섹션 범위 수정 하기
 * - 최적화 하기
 * - 현재 컴포넌트의 성향은 page에 가까운 영역 수정하기
 * - resize 조절 컴포넌트 분리하기 (widgets ?)
 * - 자소설 : 책와 유사한 디자인 컨셉 수정하기
 */
function CoverLetter() {
  const headerTitle = '나의 자소설';

  const [isDragging, setIsDragging] = useState(false);
  const [expendedPanel] = useState<'left' | 'right' | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);

  const dragResizePenel = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || expendedPanel) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

    if (newLeftWidth >= 20 && newLeftWidth <= 80) {
      if (leftPanelRef.current && rightPanelRef.current) {
        leftPanelRef.current.style.width = `${newLeftWidth}%`;
        rightPanelRef.current.style.width = `${100 - newLeftWidth}%`;
      }
    }
  };

  const dragResizeEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      <Header title={headerTitle} />
      <BookContainer
        ref={containerRef}
        onMouseMove={dragResizePenel}
        onMouseUp={dragResizeEnd}
        onMouseLeave={dragResizeEnd}
      >
        <CoverLetterContainer>
          <BookLeftPannel ref={leftPanelRef}>
            <ErrorBoundary
              renderFallback={(error, onReset) => (
                <CoverLetterListFallback onReset={onReset} />
              )}
            >
              <Suspense fallback={<Spinner />}>
                <CoverLetterList />
              </Suspense>
            </ErrorBoundary>
          </BookLeftPannel>
          <BookCenter
            onMouseDown={(e) => {
              e.stopPropagation();
              setIsDragging(true);
            }}
          >
            <Divider />
          </BookCenter>

          <BookRightPannel ref={rightPanelRef}>
            <Suspense fallback={<Spinner />}>
              <CoverLetterDetailLayout />
            </Suspense>
          </BookRightPannel>
        </CoverLetterContainer>
      </BookContainer>
    </>
  );
}

export default CoverLetter;

const BookContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const BookRightPannel = styled.div`
  will-change: width;
  width: 100%;
  transform: translateZ(0);
`;

const BookLeftPannel = styled.div`
  will-change: width;
  width: 100%;
  transform: translateZ(0);
`;

const CoverLetterContainer = styled(Container.ItemBase)`
  display: flex;
  width: 100%;
  color: ${(props) => props.theme.colors.text};
  height: 65rem;
  @media screen and (max-width: ${V.mediaTablet}) {
    ${styleMixin.Column('flex-start', 'flex-start')}
    gap:1rem;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 5rem;
  background-color: ${(props) => props.theme.colors.primary};
`;

const BookCenter = styled.div`
  cursor: col-resize;
  ${styleMixin.Column()};
  height: 100%;
  min-width: 0.5rem;
  max-width: 0.5rem;
  background-color: ${(props) => props.theme.colors.highlightColor};
  border-radius: 1rem;
`;

// rgba(15, 118, 110, 0.3);
