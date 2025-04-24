import {
  BiEdit,
  BiSolidVideoRecording,
  BiCommentDetail,
  BiHome,
} from 'react-icons/bi';

import { MenuItemType } from '@/src/shared/ui/nav';

/** Navbar에 생성할 리스트를 통제하기 위한 역할 */
export const navList: MenuItemType[] = [
  {
    title: 'Home',
    path: '/',
    keyword: 'none',
    icon: <BiHome />,
  },
  {
    title: '자소서작성',
    path: '/coverLetter',
    keyword: '/coverLetter',
    icon: <BiEdit />,
  },
  {
    title: '면접연습',
    path: '/interview',
    keyword: '/interview',
    icon: <BiSolidVideoRecording />,
  },
  {
    title: 'Q&A',
    path: '/qna/list',
    keyword: '/qna',
    icon: <BiCommentDetail />,
  },
];
