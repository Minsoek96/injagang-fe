import { memo } from 'react';
import styled from 'styled-components';
import { RxDragHandleHorizontal } from 'react-icons/rx';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { styleMixin, V } from '@/src/shared/styles';
import { S } from '@/src/entities/interview_question';

const { ListItem, ItemText } = S;

type AddQuestionItemProps = {
  item: string;
  isDeleteZone?: boolean;
};

function PlayListItem({ item, isDeleteZone = false }: AddQuestionItemProps) {
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
    transition,
    zIndex: isDragging ? 999 : 'auto',
    opacity: isDragging ? 0.5 : 1,
    touchAction: 'none',
  };

  return (
    <PlayItemContainer
      ref={setNodeRef}
      style={{ ...style }}
      $isDragging={isDragging}
      $isDeleteZone={isDeleteZone}
      {...attributes}
      {...listeners}
    >
      <ContentWrapper>
        <ItemText>{item}</ItemText>
        {isDeleteZone && <RemoveText>Remove</RemoveText>}
      </ContentWrapper>
      <IconWrapper>
        <RxDragHandleHorizontal />
      </IconWrapper>
    </PlayItemContainer>
  );
}

export default memo(PlayListItem);

type PlayItemProps = {
  $isDragging: boolean;
  $isDeleteZone: boolean;
};

const PlayItemContainer = styled(ListItem)<PlayItemProps>`
  position: relative;
  border: 0.1em
    ${({ $isDeleteZone, theme }) =>
    ($isDeleteZone
      ? `dashed ${theme.colors.red}`
      : `solid ${theme.colors.mainLine}`)};

  border-left: 4px solid
    ${({ $isDeleteZone, theme }) =>
    ($isDeleteZone ? theme.colors.red : theme.colors.signatureColor)};
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
  overflow: hidden;
  width: calc(100% - 3rem);
`;

const RemoveText = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  color: ${(props) => props.theme.colors.red};
  font-size: 2rem;
  font-weight: 600;
`;

const IconWrapper = styled.div`
  ${styleMixin.Flex()}
  position: absolute;
  right: 0;
  font-size: 3rem;
  color: ${(props) => props.theme.colors.highlightLine};
`;
