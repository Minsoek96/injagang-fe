import { useRouter } from 'next/router';

import styled from 'styled-components';

import { QuestionEditForm } from '@/src/features/question-composer';

import { boardMutation, boardType, useBoardStore } from '@/src/entities/qnaboard';

import { styleMixin, V } from '@/src/shared/styles';
import { usePageRouter } from '@/src/shared/hooks';
import { Container, Spinner } from '@/src/shared/ui';

function QuestinEdit() {
  const router = useRouter();
  const { id: boardId } = router.query;
  const { mutate: reviseBoard } = boardMutation.useReviseBoard();
  const { moveBoardDetailPage } = usePageRouter();

  const editBoardState = useBoardStore((state) => state.editBoardState);
  const setEditBoardState = useBoardStore((state) => state.setEditBoardState);
  const initEditBoardState = useBoardStore((state) => state.initEditBoardState);

  const defaultValues = {
    changeTitle: editBoardState.title,
    changeContent: editBoardState.content,
    boardId: Number(boardId),
  };

  const onSubmit = (data: boardType.IReviseQnaBoard) => {
    reviseBoard(data, {
      onSuccess: () => {
        initEditBoardState();
        moveBoardDetailPage(Number(boardId));
      },
      onError: () => {
        const boardState = {
          title: data.changeTitle,
          content: data.changeContent,
        };
        setEditBoardState(boardState);
      },
    });
  };

  if (!defaultValues.changeTitle && !defaultValues.changeContent && !defaultValues.boardId) {
    return <Spinner />;
  }

  return (
    <ComposerContainer>
      <QuestionEditForm onSubmit={onSubmit} defaultValues={defaultValues} />
    </ComposerContainer>
  );
}

export default QuestinEdit;

const ComposerContainer = styled(Container.ItemBase)`
  ${styleMixin.Flex('flex-start')}
  width: 100%;
  height: 100%;
  gap: 30px;
  @media screen and (max-width: ${V.mediaWeb}) {
    ${styleMixin.Column('flex-start')}
  }
`;
