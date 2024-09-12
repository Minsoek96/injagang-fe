import { BiLogIn } from 'react-icons/bi';

import { NavMenuItem } from '@/src/shared/ui/nav';

export default function LoginMenu() {
  return <NavMenuItem icon={<BiLogIn />} title="Login" path="/login" />;
}
