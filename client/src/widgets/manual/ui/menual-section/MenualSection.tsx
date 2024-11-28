import { useState } from 'react';

import { styled } from 'styled-components';

import { useSectionObserver } from '@/src/shared/hooks';
import { styleMixin, V } from '@/src/shared/styles';
import { ArrowDown } from '@/src/shared/ui';

import { ManualData } from '@/src/widgets/manual/model/types';
import Images from './Images';

export default function Section({ ...props }: ManualData) {
  const { main, sub, imageList } = props;
  const [isVisible, setIsVisible] = useState(false);
  const { targetItemRef } = useSectionObserver(() => setIsVisible(true), 0.5);

  return (
    <SectionContainer ref={targetItemRef} $isVisible={isVisible}>
      <TextGroup>
        <Title>{main}</Title>
        <SubTitle>{sub}</SubTitle>
      </TextGroup>
      <Images imageList={imageList} />
      <ArrowDown />
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
`;

const TextGroup = styled.div`
  ${styleMixin.Column()}
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;

  @media (max-width: ${V.mediaTablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${V.mediaMobile}) {
    font-size: 2rem;
  }
`;

const SubTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 0.05em;

  &::before,
  &::after {
    content: "V";
    margin: 0 0.5em;
    opacity: 0.7;
  }

  @media (max-width: ${V.mediaTablet}) {
    font-size: 2rem;
  }

  @media (max-width: ${V.mediaMobile}) {
    font-size: 1.6rem;
  }
`;
