import { DropItemType } from '@/src/shared/ui/dropbox';
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
  contents: {
    title: 'TEST_TITLE',
    message: 'TEST_MODAL',
  },
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

const sampleDropList: DropItemType[] = [
  {
    id: 'drop-01',
    type: 'link',
    link: {
      path: '/test-path',
      label: 'Test-Label1',
      icon: <i />,
      title: 'Test-Title1',
    },
  },
  {
    id: 'drop-02',
    type: 'link',
    link: {
      path: '/test-path',
      label: 'Test-Label2',
      icon: <i />,
      title: 'Test-Title2',
    },
  },
  {
    id: 'drop-03',
    type: 'component',
    component: <div>컴포넌트</div>,
  },
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
  sampleDropList,
  sampleNavList,
  sampleStepList,
};
