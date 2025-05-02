import { styled } from 'styled-components';

import { blink, styleMixin } from '@/src/shared/styles';
import RunningLoader from './RunningLoader';

type Props = {
  text?: string;
};

export default function GlobalLoading({
  text = '페이지를 가져오는 중 입니다',
}: Props) {
  return (
    <Overlay>
      <RunningLoader />
      <LoadingText>
        <TextWithDots>
          {text}
          <DotAnimation>....</DotAnimation>
        </TextWithDots>
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
  word-break: keep-all;
  padding: 2rem;
`;

const LoadingText = styled.div`
  ${styleMixin.Flex()}
  text-align: center;
  flex-wrap: wrap;
  color: white;
`;

const TextWithDots = styled.div`
  display: inline;
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.05em;

  @media (max-width: 480px) {
    line-height: 1.4;
  }
`;

const DotAnimation = styled.span`
  display: inline;
  font-size: inherit;
  &::after {
    content: "...";
    animation: ${blink} 1.4s infinite;
    animation-fill-mode: both;
  }
`;
