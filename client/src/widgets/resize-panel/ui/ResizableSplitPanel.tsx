import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from 'react';

import { styled } from 'styled-components';
import { styleMixin, V } from '@/src/shared/styles';

import {
  LiaAngleDoubleLeftSolid,
  LiaAngleDoubleRightSolid,
} from 'react-icons/lia';
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
  children: ReactNode;
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
    panelRefs, dragResizeEnd, dragResizePanel, dragResizePanelTouch,
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
        {children}
      </BookContainer>
    </ResizeablePanelContext.Provider>
  );
}

type PanelProps = {
  children: ReactNode;
};

function PanelExpander() {
  const { togglePanelExpansion, expandedPanel } = useResizablePanelContext();

  const handleLeftClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      togglePanelExpansion('left');
    },
    [togglePanelExpansion],
  );

  const handleRightClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      togglePanelExpansion('right');
    },
    [togglePanelExpansion],
  );

  return (
    <ButtonGroup>
      <CircleWrapper
        onClick={handleLeftClick}
        role="button"
        $isActive={expandedPanel === 'left'}
      >
        <LiaAngleDoubleLeftSolid />
      </CircleWrapper>
      <CircleWrapper
        onClick={handleRightClick}
        role="button"
        $isActive={expandedPanel === 'right'}
      >
        <LiaAngleDoubleRightSolid />
      </CircleWrapper>
    </ButtonGroup>
  );
}

function LeftPanel({ children }: PanelProps) {
  const {
    panelRefs, panelWidth, expandedPanel, togglePanelExpansion,
  } = useResizablePanelContext();

  const panelDubleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const ignoreSelectors = ['input', 'select', 'li', 'a', '.clickable', '[role="button"]'];

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
    >
      {children}
    </BookLeftPanel>
  );
}

function RightPanel({ children }: PanelProps) {
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
};

const BookContainer = styled.div`
  width: 100%;
  height: 100%;
  touch-action: none;
`;

const BookLeftPanel = styled.div<StylePanelProps>`
  will-change: width;
  overflow: hidden;
  transform: translateZ(0);
  transition: ${(props) =>
    (props.$expandedState === null ? 'none' : 'width 0.5s ease-in-out')};
`;

const BookRightPanel = styled.div<StylePanelProps>`
  will-change: width;
  overflow: hidden;
  transform: translateZ(0);
  transition: ${(props) =>
    (props.$expandedState === null ? 'none' : 'width 0.5s ease-in-out')};
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

const ButtonGroup = styled.div`
  ${styleMixin.Flex()};
  gap: 3rem;
  margin-bottom: 2rem;
`;

const CircleWrapper = styled.div<{ $isActive: boolean }>`
  ${styleMixin.Flex()};
  border-radius: 50%;
  background-color: ${({ theme, $isActive }) =>
    ($isActive
      ? theme.colors.signatureColor
      : `${theme.colors.signatureColor}5A`)};
  padding: 0.4rem;
  box-shadow: ${V.boxShadow2};
  transition: 0.5s all ease-in;
  cursor: pointer;

  svg {
    font-size: 3rem;
    color: white;
  }

  &:hover {
    background-color: ${(props) => `${props.theme.colors.signatureColor}`};
  }

  &:first-child:hover {
    transform: translateX(-10px);
  }

  &:nth-child(2):hover {
    transform: translateX(10px);
  }
`;

ResizableSplitPanel.LeftPanel = LeftPanel;
ResizableSplitPanel.RightPanel = RightPanel;
ResizableSplitPanel.Center = Center;
ResizableSplitPanel.ExpanderButton = PanelExpander;

export default ResizableSplitPanel;
