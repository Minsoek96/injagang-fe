import { useQuery } from "@tanstack/react-query";
import coverLetter from "./querykeys";
import { getCoverLetter, getDetailCoverLetter } from "./apis";
import Cookies from "js-cookie";

const useFetchCoverLetter = () => {
  const userId = Number(Cookies.get("userId"))
  return useQuery({
    queryKey: coverLetter.list(userId),
    queryFn: () => getCoverLetter(userId),
  });
};

const useFetchDetailCoverLetter = (id: number) => {
  return useQuery({
    queryKey: coverLetter.detail(id),
    queryFn: () => getDetailCoverLetter(id),
  });
};

export { useFetchCoverLetter, useFetchDetailCoverLetter };
