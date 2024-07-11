import { GrUserSettings } from 'react-icons/gr';

import useAuthStore from '@/store/auth/useAuthStore';

import LoginMenu from './LoginMenu';

import { dropMenuList } from './data';
import { DropBox } from '../dropbox';

export default function UserMenu() {
  const { role } = useAuthStore();
  return role === null ? (
    <LoginMenu />
  ) : (
    <DropBox buttonContent={<GrUserSettings />} dropList={dropMenuList} />
  );
}
