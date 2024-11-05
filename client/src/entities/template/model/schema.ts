import { z } from 'zod';

export const create = z.object({
  title: z.string().trim().min(1, '대표 제목을 설정해주세요.'),
  questions: z
    .array(
      z.object({
        id: z.string().min(1, 'ID가 필요합니다.'),
        question: z.string().trim().min(1, '빈값을 채워주세요.'),
      }),
    )
    .min(1, '최소 한개의 문항은 작성해주세요.')
    .max(5, '최대 문항 수 입니다.'),
});
