import { useQuery } from "@tanstack/react-query";

import { getFeedBackList } from "./apis";

import { feedback } from "./queryKeys";
import { useFeedStore } from "@/store/qna";

const useFetchFeedBackList = (id: number) => {
  const { targetFeed } = useFeedStore();
  return useQuery({
    queryKey: feedback.list(id),
    queryFn: () => getFeedBackList(id),
    enabled: targetFeed !== 0,
  });
};

export { useFetchFeedBackList };
