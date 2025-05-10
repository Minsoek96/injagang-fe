import { memo } from 'react';

import styled from 'styled-components';
import { MdDragHandle } from 'react-icons/md';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { styleMixin, V } from '@/src/shared/styles';

type AddQuestionItemProps = {
  item: string;
};

function PlayListItem({ item }: AddQuestionItemProps) {
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

  return (
    <PlayItemContainer
      ref={setNodeRef}
      style={{ ...style }}
      $isDragging={isDragging}
      {...attributes}
      {...listeners}
    >
      <ContentWrapper>
        <ItemText>{item}</ItemText>
        <MdDragHandle />
      </ContentWrapper>
    </PlayItemContainer>
  );
}

export default memo(PlayListItem);

const PlayItemContainer = styled.li<{
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

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;

const ContentWrapper = styled.div`
  ${styleMixin.Flex('flex-start', 'center')}
  flex: 1;
  svg {
    font-size: 3rem;
    color: ${(props) => props.theme.colors.highlightLine}
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
