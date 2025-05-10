import { styled } from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { keys } from '@/src/shared/utils';

import { PiMusicNotes } from 'react-icons/pi';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useIntvPlaylistStore } from '@/src/entities/interview_question';

import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import PlayListItem from './PlayListItem';

type Props = {
  userPlayList: string[];
  removeQuestion: (item: string) => void;
};

export default function PlayListContent({
  userPlayList,
  removeQuestion,
}: Props) {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const [isOutsideDroppableArea, setIsOutsideDroppableArea] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const reorderPlayList = useIntvPlaylistStore(
    (state) => state.reorderPlayList,
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const containerRect = containerRef.current?.getBoundingClientRect();
    const { clientX, clientY } = e;
    const outside = clientX < containerRect.left - 50
        || clientX > containerRect.right + 50
        || clientY < containerRect.top - 50
        || clientY > containerRect.bottom + 50;

    setIsOutsideDroppableArea(outside);
  }, [isDragging]);

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (isOutsideDroppableArea) {
      removeQuestion(active.id as string);
    }

    if (over && active.id !== over.id) {
      const oldIndex = userPlayList.findIndex((item) => item === active.id);
      const newIndex = userPlayList.findIndex((item) => item === over.id);
      const newItems = arrayMove(userPlayList, oldIndex, newIndex);
      reorderPlayList(newItems);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setIsOutsideDroppableArea(false);
  };

  const hasPlayList = userPlayList && userPlayList.length > 0;
  if (!hasPlayList) {
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
            <PlayListItem
              key={keys(question, idx)}
              item={question}
            />
          ))}
        </SortableContext>
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
