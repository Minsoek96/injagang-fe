import { TOAST_MODE } from '@/src/shared/const';

export const sampleToast = {
  id: '테스트',
  message: '알림',
  mode: TOAST_MODE.SUCCESS,
  duration: 100,
  startTime: Date.now(),
} as const;

export const sampleModal = {
  contents: {
    title: 'TEST_TITLE',
    message: 'TEST_MODAL',
  },
};
