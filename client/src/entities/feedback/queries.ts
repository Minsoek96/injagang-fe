import { useQuery } from '@tanstack/react-query';

import { useFeedStore } from '@/src/entities/qnaboard';
import { getFeedBackList } from './apis';

import feedback from './queryKeys';

const useFetchFeedBackList = (id: number) => {
  const { targetFeed } = useFeedStore();
  return useQuery({
    queryKey: feedback.list(id),
    queryFn: () => getFeedBackList(id),
    enabled: targetFeed !== 0,
  });
};

export { useFetchFeedBackList };
