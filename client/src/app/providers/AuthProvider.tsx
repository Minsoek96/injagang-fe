import { useAuth } from '@/src/shared/hooks';

type Props = {
  children: React.ReactNode;
};
export default function AuthProvider({ children }: Props) {
  useAuth();
  return <div>{children}</div>;
}
