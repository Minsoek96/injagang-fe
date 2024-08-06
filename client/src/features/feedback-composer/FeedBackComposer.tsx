import { useEffect } from 'react';

import styled from 'styled-components';

import { useBoardStore, useFeedStore } from '@/src/entities/qnaboard';
import { Container, ResizeableTextarea } from '@/src/shared/components';

import { V } from '@/src/shared/styles';

import CorrectionView from './CorrectionView';
import FeedBackFooter from './FeedBackFooter';
import useFeedBackLogic from './useFeedBackLogic';

function FeedBackComposer() {
  const { targetFeed, setTargetFeed } = useFeedStore();

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
    if (selectedCorrection.targetQuestion) {
      textRef.current?.focus();
    }
  }, [selectedCorrection.targetQuestion, textRef]);

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
        targetQuestion={selectedCorrection.targetQuestion}
      />
      <ResizeableTextarea
        placeholder="피드백을 작성해주세요."
        text={feedbackContent}
        setText={handleChangeFeedBack}
        ref={textRef}
        maxSize={50}
      />
      <FeedBackFooter
        handleFeedBackIndex={setTargetFeed}
        handleSubmit={handleSubmit}
        handleClear={correctionClear}
        qnaIdList={questionIds}
        feedBackIndex={targetFeed}
      />
    </ComposerContainer>
  );
}

export default FeedBackComposer;

const ComposerContainer = styled(Container.ArticleCard)`
  font-family: ${V.malgunGothic}
`;
