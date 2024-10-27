import { z } from 'zod';

const create = z.object({
  title: z.string().trim().min(1, '대표 제목을 설정해주세요.'),
  content: z.string().trim().min(1, '내용을 등록해주세요.'),
  essayId: z.number().refine((val) => val !== 0, {
    message: '자소서를 첨부해주세요.',
  }),
});

const revise = z.object({
  changeTitle: z.string().trim().min(1, '대표 제목을 설정해주세요.'),
  changeContent: z.string().trim().min(1, '내용을 등록해주세요.'),
  boardId: z.number().min(1),
});

export { create, revise };
