import styled from 'styled-components';

import { BaseCard } from '@/src/shared/components/card';
import { styleMixin } from '@/src/shared/styles';
import { useBoardStore } from '@/src/entities/qnaboard';

import userQnaManager from '@/src/features/qna/hooks/userQnaManager';
import { MainTextArea } from '@/src/shared/components';
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

  return (
    <BaseCard $size={{ width: '80%', height: '35vh', flex: 'col' }}>
      <CorrectionView
        targetAnswer={selectedCorrection.targetAnswer}
        targetQuestion={selectedCorrection.targetQuestion}
      />
      <CommentTop>
        <MainTextArea
          placeholder="피드백을 작성해주세요."
          text={correctionText}
          setText={handleChangeFeedBack}
          ref={textRef}
        />
      </CommentTop>
      <FeedBackFooter
        handleFeedBackIndex={dispatchChangeFeed}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        qnaIdList={questionIds}
        feedBackIndex={targetFeed}
      />
    </BaseCard>
  );
}

export default FeedBackComposer;

const CommentTop = styled.div`
  height: 50%;
  width: 100%;
  margin: 15px auto;
  textarea {
    ${styleMixin.ScrollBar}
    height: 100%;
    width: 100%;
    border-radius: 15px;
    resize: none;
  }
`;
