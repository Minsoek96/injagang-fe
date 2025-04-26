import {
  Suspense, useRef, useState, useCallback,
} from 'react';
import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
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
  const [expandedPanel, setExpandedPanel] = useState<'left' | 'right' | null>(
    null,
  );

  const [panelWidth, setPanelWidth] = useState({
    leftWidth: 50,
    rightWidth: 50,
  });

  const prevWidthsRef = useRef({ left: 50, right: 50 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);

  // 사이즈 조절 컨트롤
  const dragResizePenel = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || expandedPanel) {
        return;
      }

      const container = containerRef.current;
      if (!container) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      if (newLeftWidth >= 20 && newLeftWidth <= 80) {
        const newRightWidth = 100 - newLeftWidth;
        setPanelWidth({
          leftWidth: newLeftWidth,
          rightWidth: newRightWidth,
        });

        prevWidthsRef.current = {
          left: newLeftWidth,
          right: newRightWidth,
        };
      }
    },
    [isDragging, expandedPanel],
  );

  // 사이즈 조절 시작
  const dragResizeEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 섹션 확장
  const togglePanelExpansion = useCallback((panel: 'left' | 'right') => {
    setExpandedPanel((prev) => {
      if (prev === panel) {
        setPanelWidth({
          leftWidth: prevWidthsRef.current.left,
          rightWidth: prevWidthsRef.current.right,
        });
        return null;
      }

      setPanelWidth({
        leftWidth: panel === 'left' ? 100 : 0,
        rightWidth: panel === 'right' ? 100 : 0,
      });

      return panel;
    });
  }, []);

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
          <BookLeftPanel
            ref={leftPanelRef}
            $expandedState={expandedPanel}
            style={{ width: `${panelWidth.leftWidth}%` }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              togglePanelExpansion('left');
            }}
          >
            <ErrorBoundary
              renderFallback={(error, onReset) => (
                <CoverLetterListFallback onReset={onReset} />
              )}
            >
              <Suspense fallback={<Spinner />}>
                <CoverLetterList />
              </Suspense>
            </ErrorBoundary>
          </BookLeftPanel>

          <BookCenter
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragging(true);
            }}
          >
            <Divider />
          </BookCenter>

          <BookRightPanel
            ref={rightPanelRef}
            $expandedState={expandedPanel}
            style={{ width: `${panelWidth.rightWidth}%` }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              togglePanelExpansion('right');
            }}
          >
            <Suspense fallback={<Spinner />}>
              <CoverLetterDetailLayout />
            </Suspense>
          </BookRightPanel>
        </CoverLetterContainer>
      </BookContainer>
    </>
  );
}

export default CoverLetter;

type PanelProps = {
  $expandedState: 'left' | 'right' | null;
};

const BookContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const BookRightPanel = styled.div<PanelProps>`
  will-change: width;
  overflow: hidden;
  transform: translateZ(0);
  transition: ${(props) =>
    (props.$expandedState === null ? 'none' : 'width 0.2s ease-in-out')};
`;

const BookLeftPanel = styled.div<PanelProps>`
  will-change: width;
  overflow: hidden;
  transform: translateZ(0);
  transition: ${(props) =>
    (props.$expandedState === null ? 'none' : 'width 0.2s ease-in-out')};
`;

const CoverLetterContainer = styled(Container.ItemBase)`
  display: flex;
  width: 100%;
  color: ${(props) => props.theme.colors.text};
  height: 65rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 5rem;
  background-color: ${(props) => props.theme.colors.primary};
  transition: background-color 0.2s ease;
`;

const BookCenter = styled.div`
  cursor: col-resize;
  ${styleMixin.Column()};
  height: 100%;
  min-width: 0.5rem;
  max-width: 0.5rem;
  background-color: ${(props) => props.theme.colors.highlightColor};
  border-radius: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;
