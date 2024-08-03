import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/src/entities/auth';
import coverLetter from './querykeys';

import { getCoverLetter, getDetailCoverLetter } from './apis';

/** 자기소개서 목록 조회 */
const useFetchCoverLetter = () => {
  const { userId } = useAuthStore();
  return useQuery({
    queryKey: coverLetter.list(userId || ''),
    queryFn: () => getCoverLetter(),
    enabled: !!userId,
  });
};
/** 자기소개서 상세 조회 */
const useFetchDetailCoverLetter = (id: number) =>
  useQuery({
    queryKey: coverLetter.detail(id),
    queryFn: () => getDetailCoverLetter(id),
    enabled: id !== 0,
  });

export { useFetchCoverLetter, useFetchDetailCoverLetter };
