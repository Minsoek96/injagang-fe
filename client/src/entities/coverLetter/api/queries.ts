import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/src/entities/auth';

import { getCoverLetter, getDetailCoverLetter } from './apis';
import coverLetter from './querykeys';

/** 자기소개서 목록 조회 */
const useFetchCoverLetter = () => {
  const nickName = useAuthStore((state) => state.nickName);
  return useQuery({
    queryKey: coverLetter.list(nickName),
    queryFn: () => getCoverLetter(),
    enabled: !!nickName,
  });
};
/** 자기소개서 상세 조회 */
const useFetchDetailCoverLetter = (id: number) =>
  useSuspenseQuery({
    queryKey: coverLetter.detail(id),
    queryFn: () => getDetailCoverLetter(id),
  });

export { useFetchCoverLetter, useFetchDetailCoverLetter };
