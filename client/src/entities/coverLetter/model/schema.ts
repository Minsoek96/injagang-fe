import { z } from 'zod';

export const schema = z.object({
  title: z.string().trim().min(1, '대표 제목을 설정해주세요.'),
  qnaList: z.array(
    z.object({
      question: z.string().trim().min(1, '빈값을 채워주세요.'),
      answer: z
        .string()
        .min(30, { message: '질문은 30자이상 입력해주세요.' }),
    }),
  ).min(1, '최소 한개의 문항은 작성해주세요..'),
});
