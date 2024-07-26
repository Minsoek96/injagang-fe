import { useQuery } from '@tanstack/react-query';

import Cookies from 'js-cookie';

import coverLetter from './querykeys';

import { getCoverLetter, getDetailCoverLetter } from './apis';

/** 자기소개서 목록 조회 */
const useFetchCoverLetter = () => {
  const userId = Number(Cookies.get('userId'));
  return useQuery({
    queryKey: coverLetter.list(userId),
    queryFn: () => getCoverLetter(userId),
  });
};

/** 자기소개서 상세 조회 */
const useFetchDetailCoverLetter = (id: number) =>
  useQuery({
    queryKey: coverLetter.detail(id),
    queryFn: () => getDetailCoverLetter(id),
  });

export { useFetchCoverLetter, useFetchDetailCoverLetter };
