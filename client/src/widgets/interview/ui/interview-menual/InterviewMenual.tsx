import { styled } from 'styled-components';

import Image from 'next/image';

import { styleMixin, V } from '@/src/shared/styles';
import { ArrowGuide } from '@/src/shared/ui';

import roomout from '@/public/assets/roomout.svg';

export default function InterviewMenual() {
  return (
    <Menual>
      <ImageContainer>
        <Image
          src={roomout}
          alt="roomout"
          width={500}
          height={500}
          quality={100}
        />
      </ImageContainer>
      <ArrowGuide targetId="Arrow_btn" guideText="Next Stage Button" />
    </Menual>
  );
}

const Menual = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
  height: 50rem;

  @media screen and (max-width: 800px) {
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
  }
`;
