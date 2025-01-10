import { useState } from 'react';

import styled from 'styled-components';

import { feedbackType } from '@/src/entities/feedback';

import { MainButton, ResizeableTextarea } from '@/src/shared/ui';
import { useModal } from '@/src/shared/hooks';
import { styleMixin, V } from '@/src/shared/styles';

type FeedBackItemsProps = {
  target: string;
  content: string;
  feedbackId: number;
  owner: boolean;
  handleUpdateFeedBack: (feedback: feedbackType.IReviseFeedBack) => void;
  handleDeleteFeedBack: (id: number) => void;
};

/** FeedBackItems 조회된 피드백 아이템
 *
 * @param target - 첨삭된 자소서 내용
 * @param content - 피드백 질문
 * @param feedbackId - 현재 피드백 아이디
 * @param owner - 작성자 여부
 * @param handleUpdateFeedBack - 피드백 수정 함수
 * @param handleDeleteFeedBack - 피드백 삭제 함수
 */
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
    setIsReadOnly(true);
  };

  const handleEdit = () => {
    setModal({
      onAction: () => setIsReadOnly(false),
      title: '피드백 수정',
      message: '피드백 내용을 수정하시겠습니까?',
    });
  };

  const handleDelete = () => {
    setModal({
      onAction: () => handleDeleteFeedBack(feedbackId),
      title: '피드백 삭제',
      message: '정말 이 피드백을 삭제하시겠습니까?',
    });
  };

  return (
    <Container>
      <Header>
        <FeedbackLabel>첨삭 피드백</FeedbackLabel>
        <FeedbackMeta>
          {owner && <MetaItem>내가 작성한 피드백</MetaItem>}
        </FeedbackMeta>
      </Header>

      <TargetWrapper>
        <TargetLabel>
          <HighlightIcon />
          첨삭 대상 문장
        </TargetLabel>
        <TargetContent>{target}</TargetContent>
      </TargetWrapper>

      <FeedbackWrapper>
        <ContentLabel>
          <FeedbackIcon />
          피드백 내용
        </ContentLabel>
        {isReadOnly ? (
          <ReadOnlyContent>{text}</ReadOnlyContent>
        ) : (
          <ResizeableTextarea
            placeholder="피드백을 입력해주세요."
            text={text}
            setText={setText}
            readOnly={isReadOnly}
            maxSize={50}
            sx={{ minHeight: 'auto', padding: '1rem' }}
          />
        )}
      </FeedbackWrapper>

      {owner && (
        <ActionButtons>
          <MainButton
            label={isReadOnly ? '수정' : '완료'}
            onClick={isReadOnly ? handleEdit : handleUpdate}
            sx={{ width: '12rem' }}
          />
          <MainButton
            label="삭제"
            onClick={handleDelete}
            sx={{ width: '12rem' }}
          />
        </ActionButtons>
      )}
    </Container>
  );
}

export default FeedBackItems;

const Container = styled.div`
  width: 100%;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  border-radius: 1.6rem;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &:hover {
    border-color: ${(props) => props.theme.colors.signatureColor};
  }
`;

const Header = styled.div`
  ${styleMixin.Flex('space-between')};
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.mainLine};
`;

const FeedbackLabel = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
`;

const FeedbackMeta = styled.div`
  ${styleMixin.Flex('flex-start')}
  gap: 1.2rem;
`;

const MetaItem = styled.span`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.signatureColor};
`;

const TargetWrapper = styled.div`
  margin-bottom: 1rem;
`;

const TargetLabel = styled.div`
  ${styleMixin.Flex('flex-start')}
  gap: 0.8rem;
  color: ${(props) => props.theme.colors.signatureColor};
  font-weight: 600;
  margin-bottom: 1rem;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const ContentLabel = styled(TargetLabel)`
  margin-bottom: 1.5rem;
`;

const TargetContent = styled.p`
  padding: 1.5rem;
  background: ${(props) => props.theme.colors.primary};
  border-left: 3px solid ${(props) => props.theme.colors.signatureColor};
  border-radius: 0.8rem;
  line-height: 1.6;
  word-break: break-all;
`;

const FeedbackWrapper = styled.div`
  margin-bottom: 1rem;
`;

const ReadOnlyContent = styled.div`
  padding: 1.5rem;
  color: ${(props) => props.theme.colors.boardText};
  line-height: 1.6;
  word-break: break-all;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 0.8rem;
`;

const HighlightIcon = styled.div`
  width: 0.4rem;
  height: 1.8rem;
  background: ${(props) => props.theme.colors.signatureColor};
  border-radius: 2px;
`;

const FeedbackIcon = styled(HighlightIcon)`
  background: ${(props) => props.theme.colors.mainLine};
`;

const ActionButtons = styled.div`
  ${styleMixin.Flex('flex-end')}
  gap: 1rem;

  @media screen and (max-width: ${V.mediaMobile}) {
    button {
      width: 100% !important;
    }
  }
`;
