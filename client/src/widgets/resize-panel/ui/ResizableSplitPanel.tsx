import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from 'react';

import { styled } from 'styled-components';
import { styleMixin, fadeOut } from '@/src/shared/styles';

import useResizablePanel from '../model/useResizablePanel';

type ContextType = ReturnType<typeof useResizablePanel>;

const ResizeablePanelContext = createContext<ContextType | null>(null);

const useResizablePanelContext = () => {
  const context = useContext(ResizeablePanelContext);
  if (!context) {
    throw new Error(
      'Resizable Panel components must be used within a ResizableSplitPanel',
    );
  }
  return context;
};

type Props = {
  children: ReactNode | ((expandedPanel: 'left' | 'right' | null) => ReactNode);
};

/**
 * 분할된 패널을 가진 컴포넌트, 영역 조절 및 패널 확장/축소 기능 제공
 *
 * @subcomponent ResizableSplitPanel.LeftPanel - 왼쪽 패널
 * @subcomponent ResizableSplitPanel.RightPanel - 오른쪽 패널
 * @subcomponent ResizableSplitPanel.Center - 중심부 사이즈 조절
 */
function ResizableSplitPanel({ children }: Props) {
  const resizeablePanelProps = useResizablePanel();
  const {
    panelRefs,
    dragResizeEnd,
    dragResizePanel,
    dragResizePanelTouch,
    expandedPanel,
  } = resizeablePanelProps;
  return (
    <ResizeablePanelContext.Provider value={resizeablePanelProps}>
      <BookContainer
        ref={(el) => {
          panelRefs.current.container = el;
        }}
        onMouseMove={dragResizePanel}
        onMouseUp={dragResizeEnd}
        onTouchMove={dragResizePanelTouch}
        onTouchEnd={dragResizeEnd}
      >
        {typeof children === 'function' ? children(expandedPanel) : children}
      </BookContainer>
    </ResizeablePanelContext.Provider>
  );
}

type PanelProps = {
  children: ReactNode;
  tooltip?: string;
};

/**
 * 분할된 패널의 왼쪽 패널
 *
 */
function LeftPanel({ children, tooltip = '더블클릭으로 확장' }: PanelProps) {
  const {
    panelRefs, panelWidth, expandedPanel, togglePanelExpansion,
  } = useResizablePanelContext();

  const panelDubleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const ignoreSelectors = [
      'input',
      'select',
      'li',
      'a',
      '.clickable',
      '[role="button"]',
    ];

    const shouldIgnore = ignoreSelectors.some((selector) =>
      target.closest(selector));

    if (!shouldIgnore) {
      togglePanelExpansion('left');
    }
  }, []);

  return (
    <BookLeftPanel
      ref={(el) => {
        panelRefs.current.left = el;
      }}
      style={{ width: `${panelWidth.leftWidth}%` }}
      onDoubleClick={panelDubleClick}
      $expandedState={expandedPanel}
      $tooltip={tooltip}
    >
      {children}
    </BookLeftPanel>
  );
}

/**
 * 분할된 패널의 왼쪽 패널
 *
 */
function RightPanel({ children, tooltip = '더블클릭으로 확장' }: PanelProps) {
  const {
    panelRefs, panelWidth, expandedPanel, togglePanelExpansion,
  } = useResizablePanelContext();

  const panelDubleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const ignoreSelectors = ['input', 'select', 'li', 'a', '[role="button"]'];

    const shouldIgnore = ignoreSelectors.some((selector) =>
      target.closest(selector));

    if (!shouldIgnore) {
      togglePanelExpansion('right');
    }
  }, []);

  return (
    <BookRightPanel
      ref={(el) => {
        panelRefs.current.right = el;
      }}
      style={{ width: `${panelWidth.rightWidth}%` }}
      onDoubleClick={panelDubleClick}
      $expandedState={expandedPanel}
      $tooltip={tooltip}
    >
      {children}
    </BookRightPanel>
  );
}

function Center() {
  const { dragResizeStart, dragResizeStartTouch } = useResizablePanelContext();

  return (
    <BookCenter
      onMouseDown={dragResizeStart}
      onTouchStart={dragResizeStartTouch}
    >
      <Divider />
    </BookCenter>
  );
}

type StylePanelProps = {
  $expandedState: 'left' | 'right' | null;
  $tooltip: string;
};

const BookContainer = styled.div`
  width: 100%;
  height: 100%;
  touch-action: none;
`;

const BookLeftPanel = styled.div<StylePanelProps>`
  will-change: width;
  overflow: ${(props) => (props.$expandedState === null ? 'visible' : 'hidden')};
  transform: translateZ(0);
  transition: ${(props) =>
    (props.$expandedState === null ? 'none' : 'width 0.5s ease-in-out')};
  position: relative;
  cursor: ${({ $expandedState }) =>
    ($expandedState === null ? 'zoom-in' : 'zoom-out')};

  /* 사라지는 툴팁 */
  &::after {
    content: "${(props) => props.$tooltip}";
    position: absolute;
    top: -10px;
    right: 10px;
    background-color: ${(props) => props.theme.colors.highlightLine};
    color: ${(props) => props.theme.colors.signatureText};
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 1.2rem;
    opacity: 0;
    pointer-events: none;
    animation: ${fadeOut} 5s ease-in-out forwards;
    animation-play-state: paused;
  }

  &:hover::after {
    animation-play-state: running;
  }
`;

const BookRightPanel = styled.div<StylePanelProps>`
  will-change: width;
  overflow: ${(props) => (props.$expandedState === null ? 'visible' : 'hidden')};
  transform: translateZ(0);
  transition: ${(props) =>
    (props.$expandedState === null ? 'none' : 'width 0.5s ease-in-out')};
  position: relative;
  cursor: ${({ $expandedState }) =>
    ($expandedState === null ? 'zoom-in' : 'zoom-out')};

  /* 사라지는 툴팁 */
  &::after {
    content: "더블클릭으로 확장";
    position: absolute;
    top: -10px;
    right: 10px;
    background-color: ${(props) => props.theme.colors.highlightLine};
    color: ${(props) => props.theme.colors.signatureText};
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 1.2rem;
    opacity: 0;
    pointer-events: none;
    animation: ${fadeOut} 5s ease-in-out forwards;
    animation-play-state: paused;
  }

  &:hover::after {
    animation-play-state: running;
  }
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
  background-color: ${(props) => props.theme.colors.highlightLine};
  border-radius: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

ResizableSplitPanel.LeftPanel = LeftPanel;
ResizableSplitPanel.RightPanel = RightPanel;
ResizableSplitPanel.Center = Center;

export default ResizableSplitPanel;
