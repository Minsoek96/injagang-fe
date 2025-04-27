import { useCallback, useRef, useState } from 'react';

const useResizablePanel = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState<'left' | 'right' | null>(null);
  const [panelWidth, setPanelWidth] = useState({
    leftWidth: 50,
    rightWidth: 50,
  });
  const prevWidthsRef = useRef({ left: 50, right: 50 });

  const panelRefs = useRef({
    container: null as HTMLDivElement | null,
    left: null as HTMLDivElement | null,
    right: null as HTMLDivElement | null,
  });

  const dragResizePanel = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || expandedPanel) {
        return;
      }

      const { container } = panelRefs.current;
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
  const dragResizeStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  // 사이즈 조절 종료
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

  return {
    expandedPanel,
    panelWidth,
    panelRefs,
    dragResizePanel,
    dragResizeStart,
    dragResizeEnd,
    togglePanelExpansion,
  };
};

export default useResizablePanel;
