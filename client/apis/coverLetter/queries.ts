import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import coverLetter from './querykeys';
import { getCoverLetter, getDetailCoverLetter } from './apis';

const useFetchCoverLetter = () => {
  const userId = Number(Cookies.get('userId'));
  return useQuery({
    queryKey: coverLetter.list(userId),
    queryFn: () => getCoverLetter(userId),
  });
};

const useFetchDetailCoverLetter = (id: number) =>
  useQuery({
    queryKey: coverLetter.detail(id),
    queryFn: () => getDetailCoverLetter(id),
  });

export { useFetchCoverLetter, useFetchDetailCoverLetter };
