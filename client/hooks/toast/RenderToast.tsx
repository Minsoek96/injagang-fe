import { useToastStore } from '@/store/toast';
import { styled } from 'styled-components';
import ToastItem from './ToastItem';

export default function RenderToast() {
  const { toastList } = useToastStore();

  return (
    <ToastContainer>
      {toastList
    && toastList.map((toast) => <ToastItem key={toast.id} {...toast} />)}
    </ToastContainer>
  );
}
const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;
