import { styled } from 'styled-components';

import { blink, styleMixin } from '@/src/shared/styles';
import RunningLoader from './RunningLoader';

type Props = {
  text?: string;
};
export default function GlobalLoading({
  text = '페이지를 가져오는 중 입니다.',
}: Props) {
  return (
    <Overlay>
      <RunningLoader />
      <LoadingText>
        <MainText>{text}</MainText>
        <DotAnimation>..</DotAnimation>
      </LoadingText>
    </Overlay>
  );
}

const Overlay = styled.div`
  ${styleMixin.Column()}
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100dvw;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
`;

const LoadingText = styled.div`
  ${styleMixin.Flex()}
  gap: 0.5rem;
  color: white;
`;

const MainText = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
`;

const DotAnimation = styled.span`
  font-size: 2rem;
  &::after {
    content: "...";
    animation: ${blink} 1.4s infinite;
    animation-fill-mode: both;
  }
`;
