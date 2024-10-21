import styled from 'styled-components';

import FeedBackViewButtons from '@/src/features/feedback-composer/FeedBackViewButton';

import ActionBtns from './ActionBtns';

interface FeedBackFooterProps {
  handleClear: () => void;
  handleSubmit: () => void;
  qnaIdList: number[];
}

function FeedBackFooter({
  handleClear,
  handleSubmit,
  qnaIdList,
}: FeedBackFooterProps) {
  const btnInfos = [
    { id: 'btn-01', text: '비우기', onClick: handleClear },
    { id: 'btn-02', text: '작성', onClick: handleSubmit },
  ];

  return (
    <CommentFooter>
      <FeedBackViewButtons qnaIdList={qnaIdList} />
      <ActionBtns btnInfos={btnInfos} />
    </CommentFooter>
  );
}

export default FeedBackFooter;

const CommentFooter = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
