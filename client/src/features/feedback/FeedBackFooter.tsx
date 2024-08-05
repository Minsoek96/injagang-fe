import styled from 'styled-components';

import { MainButton } from '@/src/shared/components/button';
import { V } from '@/src/shared/styles';
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
          <MainButton
            isActive={list === feedBackIndex}
            sx={{ width: '4rem', fontSize: '1.6rem' }}
            onAction={() => handleFeedBackIndex(list)}
            label={`${i + 1}`}
            key={list}
          />
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap:.3rem;
  @media screen and (max-width:${V.mediaMobile}){
    grid-template-columns: 1fr 1fr
  }
`;
