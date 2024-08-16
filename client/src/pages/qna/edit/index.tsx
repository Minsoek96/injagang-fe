import { useEffect } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { QuestionEditComposer } from '@/src/features/question-composer';

import { useBoardStore } from '@/src/entities/qnaboard';

import { styleMixin } from '@/src/shared/styles';

function QuestinEdit() {
  const router = useRouter();
  const { id } = router.query;
  const { initEditBoardState } = useBoardStore();

  useEffect(() => () => { initEditBoardState(); }, []);

  return (
    <WirteStyle>
      <QuestionEditComposer boardId={Number(id)} />
    </WirteStyle>
  );
}

export default QuestinEdit;

const WirteStyle = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
`;
