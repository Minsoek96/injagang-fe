import Image from 'next/image';
import { styled } from 'styled-components';

import roomWhite from '@/public/assets/roomwhite.webp';
import roomDark from '@/public/assets/roomout.webp';

import { styleMixin, V } from '@/src/shared/styles';
import { useThemeStore } from '@/src/shared/store';

import WellcomeContent from './WellcomeContent';

export default function InterviewLobby() {
  const isDark = useThemeStore((state) => state.isDark);
  const roomImage = isDark ? roomWhite : roomDark;

  return (
    <Container>
      <LobbyContainer>
        <WellcomeWrapper>
          <WellcomeContent />
        </WellcomeWrapper>
        <Image
          src={roomImage}
          alt="roomImage"
          priority
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
