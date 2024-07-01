import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getTemplate } from "./apis";

import template from "./queryKeys";

const useFetchTemplate = () => {
  return useSuspenseQuery({
    queryKey: template.list(),
    queryFn: () => getTemplate(),
  });
};

export {
    useFetchTemplate
}
