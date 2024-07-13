import { GrUserSettings } from 'react-icons/gr';

import { DropBox } from '@/src/shared/components/dropbox';
import { useAuthStore } from '@/src/entities/auth';

import LoginMenu from './LoginMenu';

import { dropMenuList } from '../data';

export default function UserMenu() {
  const { role } = useAuthStore();
  return role === null ? (
    <LoginMenu />
  ) : (
    <DropBox buttonContent={<GrUserSettings />} dropList={dropMenuList} />
  );
}
