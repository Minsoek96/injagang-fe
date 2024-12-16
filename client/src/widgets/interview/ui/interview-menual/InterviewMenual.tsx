import { styled } from 'styled-components';

import Image from 'next/image';

import { styleMixin, V } from '@/src/shared/styles';

import roomout from '@/public/assets/roomout.webp';

export default function InterviewMenual() {
  return (
    <Menual>
      <ImageContainer>
        <Image
          src={roomout}
          alt="roomout"
          width={400}
          height={500}
          quality={100}
        />
      </ImageContainer>
    </Menual>
  );
}

const Menual = styled.div`
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

const ImageContainer = styled.div`
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
    height: 100%;
    width: 100%;

    img {
      width: 100%;
    }
  }
`;
