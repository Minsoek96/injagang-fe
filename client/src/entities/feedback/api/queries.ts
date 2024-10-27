import { useQuery } from '@tanstack/react-query';

import { getFeedBackList } from './apis';

import feedback from './queryKeys';

/** 선택된 댓글 번호 조회 */
const useFetchFeedBackList = (id: number) => useQuery({
  queryKey: feedback.list(id),
  queryFn: () => getFeedBackList(id),
  enabled: id !== 0,
});

export { useFetchFeedBackList };
