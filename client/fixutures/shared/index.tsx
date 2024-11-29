import { MenuItemType } from '@/src/shared/ui/nav';
import { TOAST_MODE } from '@/src/shared/const';

const sampleToast = {
  id: '테스트',
  message: '알림',
  mode: TOAST_MODE.SUCCESS,
  duration: 100,
  startTime: Date.now(),
} as const;

const sampleModal = {
  title: 'TEST_TITLE',
  message: 'TEST_MODAL',
};

const sampleCheckList = [
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

const sampleOptionList = [
  { title: 'Option 1', id: 'test 1' },
  { title: 'Option 2', id: 'test 2' },
  { title: 'Option 3', id: 'test 3' },
];

const sampleNavList: MenuItemType[] = [
  {
    title: '테스트',
    path: '/test1',
    icon: <i data-testid="mock-icon1" />,
  },
  {
    title: '테스트2',
    path: '/test2',
    icon: <i data-testid="mock-icon2" />,
  },
  {
    title: '테스트3',
    path: '/qna/test3',
    icon: <i data-testid="mock-icon3" />,
  },
  {
    title: '테스트4',
    path: '/test4',
    icon: <i data-testid="mock-icon4" />,
  },
];

const sampleStepList = [
  { id: 'test_01', title: 'test01', recommend: '...' },
  { id: 'test_02', title: 'test02', recommend: '...' },
  { id: 'test_03', title: 'test03', recommend: '...' },
  { id: 'test_04', title: 'test04', recommend: '...' },
];
export {
  sampleToast,
  sampleModal,
  sampleCheckList,
  sampleOptionList,
  sampleNavList,
  sampleStepList,
};
