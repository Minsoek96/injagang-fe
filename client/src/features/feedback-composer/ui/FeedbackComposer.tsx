import { memo, useEffect, useMemo } from 'react';

import styled from 'styled-components';

import { boardQueries } from '@/src/entities/qnaboard';

import { Container, ResizeableTextarea } from '@/src/shared/ui';
import { V } from '@/src/shared/styles';

import { CorrectionView } from './correction-view';
import { FeedbackFooter } from './composer-footer';
import { useFeedback } from '../model';

const MemoizedCorrectionView = memo(CorrectionView);

/**
 * 피드백 작성기 컴포넌트
 *
 * - 선택된 텍스트 내용 표시 (CorrectionView)
 * - 탭 별로 다른 피드백 뷰 제공으로 여러 첨삭 내용을 정리
 * - 제출 및 초기화 기능이 포함된 푸터
 */
function FeedBackComposer() {
  const { data: boardList } = boardQueries.useFetchCurrentBoardDetail();

  const questionIds = useMemo(
    () => boardList?.qnaList.map((item) => item.qnaId),
    [boardList],
  );

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
      <MemoizedCorrectionView targetAnswer={selectedCorrection.targetAnswer} />
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
