import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';

import { styled } from 'styled-components';
import { PiMusicNotes } from 'react-icons/pi';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useIntvPlaylistStore } from '@/src/entities/interview_question';

import { styleMixin } from '@/src/shared/styles';
import { keys } from '@/src/shared/utils';

import PlayListItem from './PlayListItem';

type Props = {
  userPlayList: string[];
  removeQuestion: (item: string) => void;
};

// 삭제 영역 여유 공간
const CONTAINER_OFFSET = 50;

export default function PlayListContent({
  userPlayList,
  removeQuestion,
}: Props) {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const [isOutsideDroppableArea, setIsOutsideDroppableArea] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const reorderPlayList = useIntvPlaylistStore(
    (state) => state.reorderPlayList,
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;

      const outside = clientX < containerRect.left - CONTAINER_OFFSET
        || clientX > containerRect.right + CONTAINER_OFFSET
        || clientY < containerRect.top - CONTAINER_OFFSET
        || clientY > containerRect.bottom + CONTAINER_OFFSET;

      setIsOutsideDroppableArea(outside);
    },
    [isDragging],
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, handleMouseMove]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 8,
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // 드래그 종료 함수
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      const activeItemId = active.id as string;

      if (isOutsideDroppableArea) {
        removeQuestion(activeItemId);
      } else if (over && active.id !== over.id) {
        const oldIndex = userPlayList.findIndex(
          (item) => item === activeItemId,
        );
        const newIndex = userPlayList.findIndex((item) => item === over.id);

        if (oldIndex !== newIndex) {
          const newItems = arrayMove(userPlayList, oldIndex, newIndex);
          reorderPlayList(newItems);
        }
      }

      setIsDragging(false);
      setActiveId(null);
      setIsOutsideDroppableArea(false);
    },
    [isOutsideDroppableArea, removeQuestion, userPlayList, reorderPlayList],
  );

  // 드래그 시작 함수
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setIsDragging(true);
    setIsOutsideDroppableArea(false);
    setActiveId(event.active.id as string);
  }, []);

  if (!userPlayList?.length) {
    return <EmptyList />;
  }

  return (
    <Container ref={containerRef}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext
          items={userPlayList}
          strategy={verticalListSortingStrategy}
        >
          {userPlayList.map((question, idx) => (
            <PlayListItem key={keys(question, idx)} item={question} />
          ))}
        </SortableContext>

        {isDragging
          && activeId
          && createPortal(
            <DragOverlayStyle>
              <PlayListItem item={activeId} isDeleteZone={isOutsideDroppableArea} />
            </DragOverlayStyle>,
            document.body,
          )}
      </DndContext>
    </Container>
  );
}

function EmptyList() {
  return (
    <Container>
      <EmptyPlayList>
        <EmptyIcon>
          <PiMusicNotes />
        </EmptyIcon>
        <EmptyText>빈 플레이리스트입니다.</EmptyText>
        <EmptySubText>
          추천 질문을 찾아보거나 직접 질문을 작성해 보세요.
        </EmptySubText>
      </EmptyPlayList>
    </Container>
  );
}

const DragOverlayStyle = styled(DragOverlay)`
  background-color: ${(props) => `${props.theme.colors.signatureColor}3A`};
`;

const Container = styled.ul`
  padding-right: 0.5rem;
  height: 100%;
  width: 100%;
  margin-block: 1rem;
  overflow: hidden;
  ${styleMixin.hideScrollbarStyle}
`;

const EmptyPlayList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const EmptyText = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.lightText};
`;

const EmptySubText = styled.p`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.lightText};
`;
