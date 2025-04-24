import { useState } from 'react';
import { styled } from 'styled-components';
import { useSectionObserver } from '@/src/shared/hooks';
import { styleMixin, V } from '@/src/shared/styles';
import { ArrowDown } from '@/src/shared/ui';
import { ManualData } from '@/src/widgets/manual/model/types';
import Images from './Images';

type Props = {
  isLastSection: boolean;
};

export default function Section({ ...props }: ManualData & Props) {
  const {
    main, sub, imageList, isLastSection,
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  const { targetItemRef } = useSectionObserver(() => setIsVisible(true), 0.5);

  return (
    <SectionContainer ref={targetItemRef} $isVisible={isVisible}>
      <TextGroup tabIndex={0}>
        <Title>{main}</Title>
        <SubTitle>{sub}</SubTitle>
      </TextGroup>
      <Images imageList={imageList} />
      {!isLastSection && <ArrowDown />}
    </SectionContainer>
  );
}

const SectionContainer = styled.section<{ $isVisible: boolean }>`
  ${styleMixin.Column('start')}
  min-height: 100vh;
  gap: 2rem;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: translateY(${({ $isVisible }) => ($isVisible ? 0 : '5rem')});
  transition: opacity 0.5s ease, transform 0.5s ease;
  padding: 1rem;
  width: 100%;

  @media (max-width: ${V.mediaMobile}) {
    min-height: auto;
    padding: 0.4rem;
    margin-bottom: 4rem;
  }
`;

const TextGroup = styled.div`
  ${styleMixin.Column()}
  gap: 1rem;
  width: 100%;
  text-align: center;

  @media (max-width: ${V.mediaMobile}) {
    gap: 0.8rem;
    text-align: start;
    margin-bottom: 2rem;
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.text};
  font-size: 3.4rem;
  font-weight: 700;
  line-height: 1.2;
  width: 100%;
  word-break: break-word;

  @media (max-width: ${V.mediaTablet}) {
    font-size: 3rem;
  }

  @media (max-width: ${V.mediaMobile}) {
    font-size: 2.4rem;
    line-height: 1;
  }
`;

const SubTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  word-break: break-word;
  letter-spacing: 0.05em;
  line-height: 1.4;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.lightText};
  width: 100%;

  @media (max-width: ${V.mediaTablet}) {
    font-size: 2rem;
  }

  @media (max-width: ${V.mediaMobile}) {
    font-size: 1.6rem;
    letter-spacing: 0.02em;
  }
`;
