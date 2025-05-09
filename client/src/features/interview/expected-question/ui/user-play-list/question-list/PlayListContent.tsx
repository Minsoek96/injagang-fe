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

import PlayListItem from './PlayListItem';

type Props = {
  userPlayList: string[];
  removeQuestion: (item: string) => void;
};

export default function PlayListContent({
  userPlayList,
  removeQuestion,
}: Props) {
  const reorderPlayList = useIntvPlaylistStore(
    (state) => state.reorderPlayList,
  );

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

    if (over && active.id !== over.id) {
      const oldIndex = userPlayList.findIndex((item) => item === active.id);
      const newIndex = userPlayList.findIndex((item) => item === over.id);
      const newItems = arrayMove(userPlayList, oldIndex, newIndex);
      reorderPlayList(newItems);
    }
  };

  const hasPlayList = userPlayList && userPlayList.length > 0;
  if (!hasPlayList) {
    return <EmptyList />;
  }
  return (
    <Container>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={userPlayList}
          strategy={verticalListSortingStrategy}
        >
          {userPlayList.map((question, idx) => (
            <PlayListItem
              key={keys(question, idx)}
              item={question}
              handleRemoveText={removeQuestion}
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
  overflow-x: hidden;
  margin-block: 1rem;
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
