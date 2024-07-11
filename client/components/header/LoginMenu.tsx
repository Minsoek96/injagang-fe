import { BiLogIn } from 'react-icons/bi';
import NavMenuItem from '../nav/NavMenuItem';

export default function LoginMenu() {
  return (
    <NavMenuItem icon={<BiLogIn />} title="Login" path="/login" />
  );
}
