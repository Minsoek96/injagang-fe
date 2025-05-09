import { memo, useState } from 'react';

import styled from 'styled-components';
import { BiTrash } from 'react-icons/bi';
import { MdDragHandle } from 'react-icons/md';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { HideSvg } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

type AddQuestionItemProps = {
  item: string;
  handleRemoveText: (question: string) => void;
};

function PlayListItem({ item, handleRemoveText }: AddQuestionItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition:
      transition
      || 'transform 350ms cubic-bezier(0.25, 1, 0.5, 1), opacity 200ms ease',
    zIndex: isDragging ? 999 : 'auto',
    opacity: isDragging ? 0.5 : 1,
    touchAction: 'none',
  };

  const handleRemoveClick = () => {
    setIsRemoving(true);
  };

  const handleAnimationEnd = () => {
    if (isRemoving) {
      handleRemoveText(item);
    }
  };

  return (
    <PlayItemContainer
      ref={setNodeRef}
      style={{ ...style }}
      $isDragging={isDragging}
      $isRemoving={isRemoving}
      onAnimationEnd={handleAnimationEnd}
      {...attributes}
      {...listeners}
    >
      <ContentWrapper>
        <MdDragHandle />
        <ItemText>{item}</ItemText>
      </ContentWrapper>
      <HideSvg
        Logo={<BiTrash />}
        label="삭제"
        onClick={handleRemoveClick}
        sx={{ fontSize: '2.5rem' }}
      />
    </PlayItemContainer>
  );
}

export default memo(PlayListItem);

const PlayItemContainer = styled.li<{
  $isRemoving: boolean;
  $isDragging: boolean;
}>`
  ${styleMixin.Flex('space-between', 'center')}
  margin-bottom: 1rem;
  line-height: 1.5;
  border: 0.1em solid ${(props) => props.theme.colors.mainLine};
  border-left: 2px solid ${(props) => props.theme.colors.signatureColor};
  border-radius: 5px;
  padding: 0.8em 1em;
  height: 6rem;
  will-change: transform, opacity;
  cursor: grab;

  &:hover {
    box-shadow: ${V.boxShadow2};
  }

  &:active {
    cursor: grabbing;
  }

  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  opacity: ${(props) => (props.$isRemoving ? 0 : 1)};
  transform: ${(props) => (props.$isRemoving ? 'scale(0.8)' : 'scale(1)')};
  animation: ${(props) =>
    (props.$isRemoving ? 'removeAnimation 0.5s forwards' : 'none')};

  @keyframes removeAnimation {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.8);
    }
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;

const ContentWrapper = styled.div`
  ${styleMixin.Flex('flex-start', 'center')}
  flex: 1;
  svg {
    font-size: 3rem;
  }
`;

const ItemText = styled.span`
  padding-inline: 1rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
