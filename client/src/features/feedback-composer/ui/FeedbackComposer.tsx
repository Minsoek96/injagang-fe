import { useEffect } from 'react';

import styled from 'styled-components';

import { boardQueries } from '@/src/entities/qnaboard';

import { Container, ResizeableTextarea } from '@/src/shared/ui';
import { V } from '@/src/shared/styles';

import { CorrectionView } from './correction-view';
import { FeedbackFooter } from './composer-footer';
import { useFeedback } from '../model';

function FeedBackComposer() {
  const {
    data: boardList,
  } = boardQueries.useFetchCurrentBoardDetail();

  const questionIds = boardList?.qnaList.map((item) => item.qnaId);

  const {
    textRef,
    feedbackContent,
    selectedCorrection,
    handleChangeFeedBack,
    handleSubmit,
    correctionClear,
  } = useFeedback();

  useEffect(() => {
    if (selectedCorrection.targetQuestionIndex) {
      textRef.current?.focus();
    }
  }, [selectedCorrection.targetQuestionIndex, textRef]);

  return (
    <ComposerContainer
      $size={{
        width: '100%',
        height: '100%',
        isMedia: true,
      }}
    >
      <CorrectionView
        targetAnswer={selectedCorrection.targetAnswer}
      />
      <ResizeableTextarea
        placeholder="피드백을 작성해주세요."
        text={feedbackContent}
        setText={handleChangeFeedBack}
        ref={textRef}
        maxSize={50}
      />
      <FeedbackFooter
        handleSubmit={handleSubmit}
        handleClear={correctionClear}
        qnaIdList={questionIds ?? []}
      />
    </ComposerContainer>
  );
}

export default FeedBackComposer;

const ComposerContainer = styled(Container.ArticleCard)`
  font-family: ${V.malgunGothic};
`;
