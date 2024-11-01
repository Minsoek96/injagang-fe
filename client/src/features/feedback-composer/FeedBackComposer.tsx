import { useEffect } from 'react';

import styled from 'styled-components';

import { useBoardStore } from '@/src/entities/qnaboard';

import { Container, ResizeableTextarea } from '@/src/shared/ui';
import { V } from '@/src/shared/styles';

import useFeedBackLogic from './model/useFeedBackLogic';
import CorrectionView from './CorrectionView';
import FeedBackFooter from './FeedBackFooter';

function FeedBackComposer() {
  const { questionIds } = useBoardStore();

  const {
    textRef,
    feedbackContent,
    selectedCorrection,
    handleChangeFeedBack,
    handleSubmit,
    correctionClear,
  } = useFeedBackLogic();

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
      <FeedBackFooter
        handleSubmit={handleSubmit}
        handleClear={correctionClear}
        qnaIdList={questionIds}
      />
    </ComposerContainer>
  );
}

export default FeedBackComposer;

const ComposerContainer = styled(Container.ArticleCard)`
  font-family: ${V.malgunGothic};
`;
