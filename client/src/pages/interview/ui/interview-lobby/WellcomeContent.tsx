import { useState } from 'react';

import { styled } from 'styled-components';

import { useInterval } from '@/src/shared/hooks';
import { fadeIn, V } from '@/src/shared/styles';

export default function WellcomeContent() {
  const [tipIndex, setTipIndex] = useState(0);

  const welcomeMessages = [
    'R_M 면접 시뮬레이션에 오신 것을 환영합니다.',
    '맞춤형 질문 세트로 자신만의 면접 환경을 구성해보세요.',
    '랜덤 질문 모드로 예상치 못한 상황에 대비할 수 있습니다.',
    '발음 인식 기능이 더 정확한 답변 연습을 도와드립니다.',
    'AI 피드백으로 면접 답변을 한 단계 높여보세요.',
  ];

  useInterval(() => {
    setTipIndex((prevIndex) => (prevIndex + 1) % welcomeMessages.length);
  }, 5000);

  return <WellcomeCotent>{welcomeMessages[tipIndex]}</WellcomeCotent>;
}

const WellcomeCotent = styled.p`
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  animation: ${fadeIn} 0.5ms ease-out;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.8rem;
  }
`;
