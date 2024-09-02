import { useState } from 'react';

import styled from 'styled-components';

import { feedbackType } from '@/src/entities/feedback';

import {
  MainButton,
  ResizeableTextarea,
  Container,
} from '@/src/shared/components/';
import { useModal } from '@/src/shared/hooks';
import { V } from '@/src/shared/styles';

type FeedBackItemsProps = {
  target: string;
  content: string;
  feedbackId: number;
  owner: boolean;
  handleUpdateFeedBack: (feedback: feedbackType.IReviseFeedBack) => void;
  handleDeleteFeedBack: (id:number) => void;
};

function FeedBackItems({
  target,
  content,
  feedbackId,
  owner,
  handleUpdateFeedBack,
  handleDeleteFeedBack,
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

  const userDeleteConfirm = () => {
    setModal({
      onAction: () => handleDeleteFeedBack(feedbackId),
      contents: {
        title: '경고',
        message: '정말 피드백 삭제를 원하시나요?',
      },
    });
  };
  return (
    <Container.ArticleCard
      $size={{
        width: '100%',
        height: '100%',
        flex: 'col',
        isMedia: true,
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
            <MainButton
              label={isReadOnly ? '편집' : '수정완료'}
              onClick={isReadOnly ? userEditConfirm : handleUpdate}
              sx={{ width: '15rem', font: '1.5rem' }}
            />
            <MainButton
              label="삭제"
              onClick={userDeleteConfirm}
              sx={{ width: '15rem', font: '1.5rem' }}
            />
          </ControlRightButtons>
        )}
      </CommentFooter>
    </Container.ArticleCard>
  );
}

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
`;

const CommentReadOnlyWrapper = styled.div`
  width: 100%;
  text-align: left;
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

  @media screen and (max-width: ${V.mediaMobile}) {
    button {
      width: auto!important;;
    }
  }
`;
