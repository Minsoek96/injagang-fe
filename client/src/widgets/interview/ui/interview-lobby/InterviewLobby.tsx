import { useState } from 'react';

import Image from 'next/image';
import { styled } from 'styled-components';

import { fadeIn, styleMixin, V } from '@/src/shared/styles';
import { useInterval } from '@/src/shared/hooks';
import { useThemeStore } from '@/src/shared/store';

import roomWhite from '@/public/assets/roomwhite.webp';
import roomDark from '@/public/assets/roomout.webp';

export default function InterviewLobby() {
  const [tipIndex, setTipIndex] = useState(0);

  const { isDark } = useThemeStore();
  const roomImage = isDark ? roomWhite : roomDark;

  const welcomeMessages = [
    '인자강 면접 시뮬레이션에 오신 것을 환영합니다.',
    '맞춤형 질문 세트로 자신만의 면접 환경을 구성해보세요.',
    '랜덤 질문 모드로 예상치 못한 상황에 대비할 수 있습니다.',
    '발음 인식 기능이 더 정확한 답변 연습을 도와드립니다.',
    'AI 피드백으로 면접 답변을 한 단계 높여보세요.',
  ];

  useInterval(() => {
    setTipIndex((prevIndex) => (prevIndex + 1) % welcomeMessages.length);
  }, 3000);

  return (
    <Container>
      <LobbyContainer>
        <WellcomeWrapper>
          <WellcomeCotent>{welcomeMessages[tipIndex]}</WellcomeCotent>
        </WellcomeWrapper>
        <Image
          src={roomImage}
          alt="roomImage"
          width={400}
          height={500}
          quality={100}
        />
      </LobbyContainer>
    </Container>
  );
}

const Container = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
  height: 50rem;

  @media screen and (max-width: ${V.mediaTablet}) {
    .interViewImg_box {
      width: 85%;
      height: 100%;
    }
  }
`;

const LobbyContainer = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1em;
  border-radius: 1rem;
  margin-top: 3rem;
  width: 100%;
  height: 60rem;
  min-height: 30rem;


  @media screen and (max-width: ${V.mediaMobile}) {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;

    img {
      width: 100%;
    }
  }
`;

const WellcomeWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 2rem;
  padding: 1.2rem;
`;

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
