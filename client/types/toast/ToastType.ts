import { TOAST_MODE } from '@/constants';

export interface IToast {
  id: string;
  message: string;
  mode: TOAST_MODE;
  duration: number;
  startTime: number;
}

export type TOAST_MODE = (typeof TOAST_MODE)[keyof typeof TOAST_MODE];
