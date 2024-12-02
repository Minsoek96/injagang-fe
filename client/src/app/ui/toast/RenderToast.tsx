import { useToast } from '@/src/shared/hooks';
import { styled } from 'styled-components';
import ToastItem from './ToastItem';

export default function RenderToast() {
  const { toastList } = useToast();

  return (
    <ToastContainer>
      {toastList
    && toastList.map((toast) => <ToastItem key={toast.id} {...toast} />)}
    </ToastContainer>
  );
}
const ToastContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 99999;
`;
