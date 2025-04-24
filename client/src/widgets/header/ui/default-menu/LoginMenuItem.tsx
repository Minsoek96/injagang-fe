import { BiLogIn } from 'react-icons/bi';

import { NavMenuItem } from '@/src/shared/ui/nav';

export default function LoginMenuItem() {
  return (
    <ul>
      <NavMenuItem
        icon={<BiLogIn />}
        title="Login"
        path="/login"
        keyword="/login"
      />
    </ul>
  );
}
