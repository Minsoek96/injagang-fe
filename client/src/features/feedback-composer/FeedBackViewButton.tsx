import { styled } from 'styled-components';

import { useFeedStore } from '@/src/entities/feedback';

import { V } from '@/src/shared/styles';
import { MainButton } from '@/src/shared/ui';

type Props = {
    qnaIdList: number[];
}

export default function FeedBackViewButtons({ qnaIdList }:Props) {
  const { targetFeed, setTargetFeed } = useFeedStore();
  return (
    <FeedBackViewBtns>
      {qnaIdList.map((list, i) => (
        <MainButton
          isActive={list === targetFeed}
          sx={{ width: '4rem', fontSize: '1.6rem' }}
          onClick={() => setTargetFeed(list)}
          label={`${i + 1}`}
          key={list}
        />
      ))}
    </FeedBackViewBtns>
  );
}

const FeedBackViewBtns = styled.div`
  display: flex;
  gap: 0.3rem;
  @media screen and (max-width: ${V.mediaMobile}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;
