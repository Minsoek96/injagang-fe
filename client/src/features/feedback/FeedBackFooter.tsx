import styled from 'styled-components';

import { BaseButton } from '@/src/shared/components/button';
import TextActionBtns from './TextActionBtns';

interface FeedBackFooterProps {
  handleClear: () => void;
  handleSubmit: () => void;
  qnaIdList: number[];
  feedBackIndex: number;
  handleFeedBackIndex: (qnaId: number) => void;
}

function FeedBackFooter({
  handleClear,
  handleFeedBackIndex,
  handleSubmit,
  qnaIdList,
  feedBackIndex,
}: FeedBackFooterProps) {
  return (
    <CommentFooter>
      <FeedBackViewBtns>
        {qnaIdList.map((list, i) => (
          <BaseButton
            className={list === feedBackIndex ? 'active_button' : ' '}
            $Size={{ width: '40px', font: '15px' }}
            onClick={() => handleFeedBackIndex(list)}
            key={list}
          >
            {`${i + 1}`}
          </BaseButton>
        ))}
      </FeedBackViewBtns>
      <TextActionBtns handleClear={handleClear} handleSubmit={handleSubmit} />
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

const FeedBackViewBtns = styled.div`
  button {
    margin-right: 3px;
  }
`;
