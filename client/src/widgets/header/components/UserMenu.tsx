import { GrUserSettings } from 'react-icons/gr';

import useAuthStore from '@/store/auth/useAuthStore';

import LoginMenu from './LoginMenu';

import { DropBox } from '../../../shared/components/dropbox';

import { dropMenuList } from '../data';

export default function UserMenu() {
  const { role } = useAuthStore();
  return role === null ? (
    <LoginMenu />
  ) : (
    <DropBox buttonContent={<GrUserSettings />} dropList={dropMenuList} />
  );
}
