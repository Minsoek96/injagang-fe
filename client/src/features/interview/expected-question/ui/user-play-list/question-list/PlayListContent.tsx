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

import { S, useIntvPlaylistStore } from '@/src/entities/interview_question';

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

  const checkIfOutSide = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();

      const outside = clientX < containerRect.left - CONTAINER_OFFSET
        || clientX > containerRect.right + CONTAINER_OFFSET
        || clientY < containerRect.top - CONTAINER_OFFSET
        || clientY > containerRect.bottom + CONTAINER_OFFSET;

      setIsOutsideDroppableArea(outside);
    },
    [isDragging],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;
      checkIfOutSide(clientX, clientY);
    },
    [checkIfOutSide],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];
      const { clientX, clientY } = touch;
      checkIfOutSide(clientX, clientY);
    },
    [checkIfOutSide],
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

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
              <PlayListItem
                item={activeId}
                isDeleteZone={isOutsideDroppableArea}
              />
            </DragOverlayStyle>,
            document.body,
          )}
      </DndContext>
    </Container>
  );
}

function EmptyList() {
  return (
    <S.EmptyContainer>
      <S.EmptyIcon>
        <PiMusicNotes />
      </S.EmptyIcon>
      <S.EmptyText>빈 플레이리스트입니다.</S.EmptyText>
      <S.EmptySubText>
        추천 질문을 찾아보거나 직접 질문을 작성해 보세요.
      </S.EmptySubText>
    </S.EmptyContainer>
  );
}

const DragOverlayStyle = styled(DragOverlay)`
  background-color: ${(props) => `${props.theme.colors.signatureColor}3A`};
  backdrop-filter: blur(1rem);
  border-radius: 5px;
`;

const Container = styled.ul`
  padding-right: 0.5rem;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  ${styleMixin.hideScrollbarStyle}
`;
