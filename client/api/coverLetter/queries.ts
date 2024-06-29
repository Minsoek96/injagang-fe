import { useQuery } from "@tanstack/react-query";
import coverLetter from "./querykeys";
import { getCoverLetter, getDetailCoverLetter } from "./apis";

const useFetchCoverLetter = (id: number) => {
  return useQuery({
    queryKey: coverLetter.list(id),
    queryFn: () => getCoverLetter(id),
  });
};

const useFetchDetailCoverLetter = (id: number) => {
  return useQuery({
    queryKey: coverLetter.detail(id),
    queryFn: () => getDetailCoverLetter(id),
  });
};

export { useFetchCoverLetter, useFetchDetailCoverLetter };
