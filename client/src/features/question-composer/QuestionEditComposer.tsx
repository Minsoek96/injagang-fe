import styled from 'styled-components';

import {
  boardType,
  useBoardStore,
  boardMutation,
} from '@/src/entities/qnaboard';

import {
  Container,
} from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';
import { usePageRouter } from '@/src/shared/hooks';
import QuestionEditForm from '@/src/features/question-composer/QuestionEditForm';

type Props = {
  boardId: number;
};

function QuestionEditComposer({ boardId }: Props) {
  const { mutate: reviseBoard } = boardMutation.useReviseBoard();
  const { moveBoardDetailPage } = usePageRouter();

  const { editBoardState } = useBoardStore();

  const defaultValues = {
    changeTitle: editBoardState.title,
    changeContent: editBoardState.content,
    boardId,
  };

  const onSubmit = (data: boardType.IReviseQnaBoard) => {
    reviseBoard(data);
    moveBoardDetailPage(boardId);
  };

  return (
    <ComposerContainer>
      <QuestionEditForm onSubmit={onSubmit} defaultValues={defaultValues} />
    </ComposerContainer>
  );
}

export default QuestionEditComposer;

const ComposerContainer = styled(Container.ItemBase)`
  ${styleMixin.Flex('flex-start')}
  width: 100%;
  height: 100%;
  gap: 30px;
  @media screen and (max-width: ${V.mediaWeb}) {
    ${styleMixin.Column('flex-start')}
  }
`;
