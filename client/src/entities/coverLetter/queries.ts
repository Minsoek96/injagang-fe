import { useQuery } from '@tanstack/react-query';

import coverLetter from './querykeys';

import { getCoverLetter, getDetailCoverLetter } from './apis';

/** 자기소개서 목록 조회 */
const useFetchCoverLetter = () => useQuery({
  queryKey: coverLetter.list(),
  queryFn: () => getCoverLetter(),
});

/** 자기소개서 상세 조회 */
const useFetchDetailCoverLetter = (id: number) =>
  useQuery({
    queryKey: coverLetter.detail(id),
    queryFn: () => getDetailCoverLetter(id),
  });

export { useFetchCoverLetter, useFetchDetailCoverLetter };
