import {
  BiEdit,
  BiSolidVideoRecording,
  BiCommentDetail,
  BiUser,
} from 'react-icons/bi';

import { DropItemType } from '@/src/shared/ui/dropbox';
import { MenuItemType } from '@/src/shared/ui/nav';

import { LogOutMenu, ThemeToggle } from '../components';

/** Navbar에 생성할 리스트를 통제하기 위한 역할 */
export const navList: MenuItemType[] = [
  {
    title: '자소서작성',
    path: '/coverLetter',
    icon: <BiEdit />,
  },
  {
    title: '면접연습',
    path: '/interview',
    icon: <BiSolidVideoRecording />,
  },
  {
    title: 'Q&A',
    path: '/qna/list',
    icon: <BiCommentDetail />,
  },
];

export const dropMenuList: DropItemType[] = [
  {
    id: 'drop-01',
    type: 'link',
    link: {
      title: '나의정보',
      path: '/myProfile',
      label: 'myProfile',
      icon: <BiUser />,
    },
  },
  {
    id: 'drop-02',
    type: 'component',
    component: <ThemeToggle />,
  },
  {
    id: 'drop-03',
    type: 'component',
    component: <LogOutMenu />,
  },
];
