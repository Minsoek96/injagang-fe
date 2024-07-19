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

export const sampleCheckList = [
  {
    id: 1,
    title: '테스트1',
  },
  {
    id: 2,
    title: '테스트2',
  },
  {
    id: 3,
    title: '테스트3',
  },
  {
    id: 4,
    title: '테스트4',
  },
  {
    id: 5,
    title: '테스트5',
  },
];
