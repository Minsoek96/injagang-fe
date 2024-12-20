import { memo } from 'react';

import styled from 'styled-components';
import { TbBellExclamation } from 'react-icons/tb';
import { IoCheckmarkCircle, IoWarning, IoInformationCircle } from 'react-icons/io5';

import {
  fadeIn,
  fadeOut,
  slideIn,
  progressBar,
} from '@/src/shared/styles/animations';
import { toastType } from '@/src/shared/types';
import { styleMixin, V } from '@/src/shared/styles';

const FIXED_DURATION = 2000;

function ToastItem({
  message, mode, duration, startTime,
}: toastType.IToast) {
  const getIcon = () => {
    switch (mode) {
    case 'SUCCESS':
      return <IoCheckmarkCircle size={24} />;
    case 'WARNING':
      return <IoWarning size={24} />;
    case 'ERROR':
      return <TbBellExclamation size={24} />;
    case 'INFO':
    default:
      return <IoInformationCircle size={24} />;
    }
  };

  return (
    <ToastMessage mode={mode}>
      <ContentWrapper>
        <IconWrapper>{getIcon()}</IconWrapper>
        <MessageText>{message}</MessageText>
      </ContentWrapper>
      <ProgressBar $duration={duration} $startTime={startTime} />
    </ToastMessage>
  );
}
export default memo(ToastItem);

const ToastMessage = styled.div<{ mode: toastType.TOAST_MODE }>`
  position: relative;
  min-width: 20rem;
  max-width: 50rem;
  background-color: ${(props) => {
    switch (props.mode) {
    case 'SUCCESS':
      return '#1c9c3c';
    case 'WARNING':
      return '#ff8800';
    case 'ERROR':
      return '#e63946';
    case 'INFO':
    default:
      return '#2b2d42';
    }
  }};
  color: white;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.6rem 2rem;
  margin-top: 1.2rem;
  border-radius: 1rem;
  box-shadow: ${V.boxShadow3};
  animation:
    ${slideIn} 0.5s forwards,
    ${fadeIn} 0.5s,
    ${fadeOut} 0.5s ${FIXED_DURATION}ms;
  will-change: opacity, transform;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
    min-width: 20rem;
    margin: 1rem 2rem 0 2rem;
    padding: 1.4rem 1.6rem;
  }
`;

const ContentWrapper = styled.div`
  ${styleMixin.Flex()}
  gap: 1.2rem;
  width: 100%;
`;

const IconWrapper = styled.div`
  ${styleMixin.Flex()}
  flex-shrink: 0;
`;

const MessageText = styled.span`
  flex: 1;
  word-break: break-word;
`;

const ProgressBar = styled.div<{ $duration: number; $startTime: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.63);
  border-radius: 0 0 1rem 1rem;
  animation: ${progressBar} ${(props) => props.$duration}ms linear;
  animation-delay: ${(props) => props.$startTime - Date.now()}ms;
`;
