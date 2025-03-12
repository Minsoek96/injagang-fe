import { styled } from 'styled-components';

import { MainButton } from '@/src/shared/ui';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { styleMixin, V } from '@/src/shared/styles';

type Props = {
  onCounterDecrease: () => void;
  onCounterIncrease: () => void;
  counter: number;
  questionLen: number;
  lastVideo: number;
};

export default function RecordNavigation({
  onCounterDecrease,
  onCounterIncrease,
  counter,
  questionLen,
  lastVideo,
}: Props) {
  // 사용자가 반복 녹화를 진행하는 경우
  const cycleCount = Math.floor(counter / questionLen) + 1;
  const currentQuestionIndex = Math.min(counter % questionLen, questionLen - 1);
  const questionProgress = `${
    currentQuestionIndex + 1
  }/${questionLen} (${cycleCount}회차)`;

  return (
    <Controller>
      <MainButton
        label={<MdArrowBackIos />}
        onClick={onCounterDecrease}
        disabled={counter === 0}
        variant="ghost"
      />
      <StatusSection>
        <StatusLabel>진행현황:</StatusLabel>
        <StatusText>{questionProgress}</StatusText>
      </StatusSection>
      <MainButton
        label={<MdArrowForwardIos />}
        onClick={onCounterIncrease}
        disabled={lastVideo <= counter}
        variant="ghost"
      />
    </Controller>
  );
}

const Controller = styled.div`
  ${styleMixin.Flex('space-between')}
  width: 100%;
  padding: 1.6rem 2rem;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 1.2rem;
  button {
    font-size: 1.8rem;
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    padding: 1.2rem 1.6rem;
  }
`;

const StatusSection = styled.div`
  ${styleMixin.Flex()}
  text-align: center;
`;

const StatusLabel = styled.span`
  font-size: 1.6rem;
  opacity: 0.8;
`;

const StatusText = styled.span`
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.signatureColor};
`;
