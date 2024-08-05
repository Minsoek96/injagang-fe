import { useState } from 'react';

import styled from 'styled-components';
import { BaseButton } from '@/src/shared/components/button';

import { ResizeableTextarea } from '@/src/shared/components/textarea';

import { useModal } from '@/src/shared/hooks';
import { feedbackType } from '@/src/entities/feedback';
import { Container } from '@/src/shared/components';

type FeedBackItemsProps = {
  target: string;
  content: string;
  feedbackId: number;
  owner: boolean;
  handleUpdateFeedBack: (feedback: feedbackType.IReviseFeedBack) => void;
};

function FeedBackItems({
  target,
  content,
  feedbackId,
  owner,
  handleUpdateFeedBack,
}: FeedBackItemsProps) {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [text, setText] = useState<string>(content);
  const { setModal } = useModal();

  const handleUpdate = () => {
    if (content !== text) {
      handleUpdateFeedBack({
        feedbackId,
        reviseContent: text,
      });
    }
    closeReadOnly();
  };

  const closeReadOnly = () => {
    setIsReadOnly(true);
  };

  const openReadOnly = () => {
    setIsReadOnly(false);
  };

  const userEditConfirm = () => {
    setModal({
      onAction: openReadOnly,
      contents: {
        title: '경고',
        message: '정말 피드백 수정을 원하시나요?',
      },
    });
  };
  return (
    <Container.ArticleCard
      $size={{
        width: '100%', height: '100%', flex: 'col', isMedia: true,
      }}
    >
      <CorrectionContainer>
        <span className="correction_title">피드백 첨부:</span>
        <p className="correction_sentence">{target}</p>
      </CorrectionContainer>
      {isReadOnly ? (
        <CommentReadOnlyWrapper>
          <p>{text}</p>
        </CommentReadOnlyWrapper>
      ) : (
        <ResizeableTextarea
          placeholder="피드백을 입력해주세요."
          text={text}
          setText={setText}
          readOnly={isReadOnly}
          maxSize={50}
          sx={{ overflow: 'hidden', minHeight: 'auto' }}
        />
      )}
      <CommentFooter>
        {owner && (
          <ControlRightButtons>
            <BaseButton
              onClick={isReadOnly ? userEditConfirm : handleUpdate}
              $Size={{ width: '150px', font: '15px' }}
            >
              {isReadOnly ? '편집' : '수정완료'}
            </BaseButton>
            <BaseButton
              onClick={() => {}}
              $Size={{ width: '150px', font: '15px' }}
            >
              삭제
            </BaseButton>
          </ControlRightButtons>
        )}
      </CommentFooter>
    </Container.ArticleCard>
  );
}

// 삭제 API가 없음

export default FeedBackItems;

const CorrectionContainer = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.boardText};

  .correction_title {
    font-weight: bold;
    color: red;
    text-align: left;
  }

  .correction_sentence {
    padding: 0.2em;
    margin-top: 1rem;
    word-break: break-all;
    line-height: 1.5;
    width: 100%;
    border-left: 0.3em solid ${(props) => props.theme.colors.brandColor};
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 1rem;
  }
`;

const CommentFooter = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 800px) {
    justify-content: center;
  }
`;

const CommentReadOnlyWrapper = styled.div`
  color: ${(props) => props.theme.colors.boardText};
  margin-top: 1.5rem;
  border-radius: 0.8rem;
  padding: 1em 0.5em;
  word-break: break-all;
  line-height: 1.5;
`;

const ControlRightButtons = styled.div`
  display: flex;
  button:first-child {
    margin-right: 5px;
  }
`;
