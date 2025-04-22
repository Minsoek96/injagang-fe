import styled from 'styled-components';

import FeedbackTab from './FeedbackTab';
import ActionButtons from './ActionButtons';

type Props = {
  handleClear: () => void;
  handleSubmit: () => void;
  qnaIdList: number[];
}

function FeedbackFooter({
  handleClear,
  handleSubmit,
  qnaIdList,
}: Props) {
  const btnInfos = [
    { id: 'btn-01', text: '비우기', onClick: handleClear },
    { id: 'btn-02', text: '작성', onClick: handleSubmit },
  ];

  return (
    <CommentFooter>
      <FeedbackTab qnaIdList={qnaIdList} />
      <ActionButtons btnInfos={btnInfos} />
    </CommentFooter>
  );
}

export default FeedbackFooter;

const CommentFooter = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
