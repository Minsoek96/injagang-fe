import { memo, useState } from 'react';

import styled from 'styled-components';
import { BiTrash } from 'react-icons/bi';

import { HideSvg } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

type AddQuestionItemProps = {
  item: string;
  handleRemoveText: (question: string) => void;
};

function PlayListItem({
  item,
  handleRemoveText,
}: AddQuestionItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveClick = () => {
    setIsRemoving(true);
  };

  const handleAnimationEnd = () => {
    if (isRemoving) {
      handleRemoveText(item);
    }
  };

  return (
    <AddQuestionItemStyle
      $isRemoving={isRemoving}
      onAnimationEnd={handleAnimationEnd}
    >
      {item}
      <HideSvg
        Logo={<BiTrash />}
        label="삭제"
        onClick={handleRemoveClick}
      />
    </AddQuestionItemStyle>
  );
}

export default memo(PlayListItem);

const AddQuestionItemStyle = styled.li<{ $isRemoving: boolean }>`
  ${styleMixin.Flex('space-between', 'center')}
  margin-bottom: 15px;
  line-height: 1.5;
  border: 0.1em solid ${(props) => props.theme.colors.mainLine};
  border-top: 0.2em solid ${(props) => props.theme.colors.signatureColor};
  border-radius: 1rem;
  padding: 1em 0.5em;

  svg {
    cursor: pointer;
    font-size: 25px;
    margin-left: 30px;
  }

  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  opacity: ${(props) => (props.$isRemoving ? 0 : 1)};
  transform: ${(props) => (props.$isRemoving ? 'scale(0.8)' : 'scale(1)')};
  animation: ${(props) => (props.$isRemoving ? 'removeAnimation 0.5s forwards' : 'none')};

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

  /* 텍스트 길이 제어 */
  white-space: normal;
  word-break: break-word;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;
