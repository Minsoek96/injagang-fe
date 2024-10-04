import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/src/entities/auth';
import coverLetter from '@/src/entities/coverLetter/lib/querykeys';
import { getCoverLetter, getDetailCoverLetter } from '@/src/entities/coverLetter/api/apis';

/** 자기소개서 목록 조회 */
const useFetchCoverLetter = () => {
  const { nickName } = useAuthStore();
  return useQuery({
    queryKey: coverLetter.list(nickName),
    queryFn: () => getCoverLetter(),
    enabled: !!nickName,
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
