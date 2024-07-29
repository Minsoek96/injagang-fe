import { useState } from 'react';

import styled from 'styled-components';
import { BaseButton } from '@/src/shared/components/button';
import { BaseCard } from '@/src/shared/components/card';

import { BaseArea } from '@/src/shared/components/textarea';

import { styleMixin } from '@/src/shared/styles';

import { useModal } from '@/src/shared/hooks';
import { feedbackType } from '@/src/entities/feedback';

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
    <FeedBackItemsStyle>
      <BaseCard $size={{ width: '80%', height: '50vh', flex: 'col' }}>
        <CorrectionContainer>
          <span className="correction_title">피드백:</span>
          <h4 className="correction_sentence">{target}</h4>
        </CorrectionContainer>
        <CommentTop>
          <BaseArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            readOnly={isReadOnly}
          />
        </CommentTop>
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
      </BaseCard>
    </FeedBackItemsStyle>
  );
}

// 삭제 API가 없음

export default FeedBackItems;

const FeedBackItemsStyle = styled.div`
  ${styleMixin.Column()}
  width: 100%;
  max-height: 500px;
  margin: 20px;
`;

const CorrectionContainer = styled.div`
  ${styleMixin.ScrollBar}
  width: 98%;
  height: 30%;
  color: red;
  overflow-x: hidden;

  .correction_title {
    font-weight: bold;
  }

  .correction_sentence {
    font-weight: normal;
    margin-top: 8px;
    color: white;
    word-break: break-all;
    line-height: 1.7;
  }
`;

const CommentTop = styled.div`
  height: 50%;
  width: 100%;
  margin: 10px auto;
  textarea {
    ${styleMixin.ScrollBar}
    width: 100%;
    padding: 15px;
    line-height: 1.5;
    border-radius: 15px;
    resize: none;
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

const ControlRightButtons = styled.div`
  display: flex;
  button:first-child {
    margin-right: 5px;
  }
`;
