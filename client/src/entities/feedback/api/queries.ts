import { useSuspenseQuery } from '@tanstack/react-query';

import { getFeedBackList } from './apis';

import feedback from './queryKeys';

/** 선택된 댓글 번호 조회 */
const useFetchFeedBackList = (id: number) => {
  const queryResult = useSuspenseQuery({
    queryKey: feedback.list(id),
    queryFn: () => {
      if (id === 0) {
        return Promise.resolve(null);
      }
      return getFeedBackList(id);
    },
  });

  return {
    ...queryResult,
  };
};
export { useFetchFeedBackList };
