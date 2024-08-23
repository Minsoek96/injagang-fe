import { keyframes, styled } from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';

type Props = {
  stepTitle: string;
  currentStep: number;
  index: number;
};

export default function StepMarker({ stepTitle, currentStep, index }: Props) {
  return (
    <Container>
      <Marker
        data-testid="marker"
        $active={currentStep === index}
        $completed={currentStep > index}
      />
      <p>
        Step.
        {index + 1}
      </p>
      <HideText>
        :
        {stepTitle}
      </HideText>
    </Container>
  );
}

const glow = (highlight: string) => keyframes`
  0% {
    box-shadow: 0 0 .2rem ${highlight};
  }
  50% {
    box-shadow: 0 0 1rem ${highlight};
  }
  100% {
    box-shadow: 0 0 .2rem ${highlight};
  }
`;

type StepProps = {
  $active: boolean;
  $completed: boolean;
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Marker = styled.div<StepProps>`
  ${styleMixin.Flex()}
  word-break: keep-all;
  padding-inline: 0.5em 1em;
  width: 100%;
  height: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
  border: 2px solid ${(props) => props.theme.colors.mainLine};
  transition: background-color 0.5s ease, box-shadow 0.5s ease;
  background-color: ${(props) => {
    if (props.$completed) return props.theme.colors.signatureColor;
    if (props.$active) return props.theme.colors.bodyColor;
    return 'none';
  }};
  color: ${(props) => props.theme.colors.text};
  animation: ${(props) =>
    props.$active && glow(props.theme.colors.highlightColor)}
    1s infinite alternate;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;

const HideText = styled.p`
  font-weight: bold;
  @media screen and (max-width: ${V.mediaMobile}) {
    display: none;
  }
`;
