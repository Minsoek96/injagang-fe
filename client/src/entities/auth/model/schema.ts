import { z } from 'zod';

export const password = z.object({
  nowPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),
  changePassword: z.string()
    .min(8, '비밀번호는 최소 8자리여야 합니다.')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.'),
}).refine((data) => data.changePassword === data.nowPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['changePasswordCheck'],
});
