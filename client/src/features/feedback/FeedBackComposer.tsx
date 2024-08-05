import styled from 'styled-components';

import userQnaManager from '@/src/features/qna/hooks/userQnaManager';
import { useBoardStore } from '@/src/entities/qnaboard';
import { Container, ResizeableTextarea } from '@/src/shared/components';

import { useEffect } from 'react';
import CorrectionView from './CorrectionView';
import FeedBackFooter from './FeedBackFooter';
import useFeedBackLogic from '../qna/hooks/useFeedBackLogic';

function FeedBackComposer() {
  const { dispatchChangeFeed, targetFeed } = userQnaManager();
  const { questionIds } = useBoardStore();
  const {
    textRef,
    correctionText,
    selectedCorrection,
    handleChangeFeedBack,
    handleSubmit,
    handleClear,
  } = useFeedBackLogic();

  // TODO:: 기본적인 컴포넌트 분리완료, 컴포넌트 모듈화 하고 상태에 대한 로직 분리하기, props에 따라 리덕스 고려하기 !!!!!!!

  // Corection에 대한 상태 떄문에 props 드릴링이 발생한다. 리덕스로 변경
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
        flex: 'col',
        isMedia: true,
      }}
    >
      <CorrectionView
        targetAnswer={selectedCorrection.targetAnswer}
        targetQuestion={selectedCorrection.targetQuestion}
      />
      <ResizeableTextarea
        placeholder="피드백을 작성해주세요."
        text={correctionText}
        setText={handleChangeFeedBack}
        ref={textRef}
        maxSize={50}
      />
      <FeedBackFooter
        handleFeedBackIndex={dispatchChangeFeed}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        qnaIdList={questionIds}
        feedBackIndex={targetFeed}
      />
    </ComposerContainer>
  );
}

export default FeedBackComposer;

const ComposerContainer = styled(Container.ArticleCard)`
  font-family: "Malgun Gothic", sans-serif;
`;
