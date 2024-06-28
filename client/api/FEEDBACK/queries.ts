import { useQuery } from "@tanstack/react-query";
import { getFeedBackList } from "./apis";
import { feedback } from "./queryKeys";


const useFetchFeedBackList = (id: number) => {
  return useQuery({
    queryKey: feedback.list(id),
    queryFn: () => getFeedBackList(id),
  });
};

export {
    useFetchFeedBackList
}