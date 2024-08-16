import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { LuTimerReset } from 'react-icons/lu';

import { useRecordInfoStore } from '@/src/entities/interview_question';
import { styleMixin } from '@/src/shared/styles';
import { useInterval } from '@/src/shared/hooks';

type Props = {
    isRunning: boolean;
};
function VideoTimer({ isRunning }: Props) {
  const { setCurTimer } = useRecordInfoStore();
  const [time, setTime] = useState(0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };

  useInterval(
    () => {
      setTime((timer) => timer + 1);
    },
    isRunning ? 1000 : null,
  );

  useEffect(() => {
    if (!isRunning && time > 10) {
      setCurTimer(formatTime(time));
      setTime(0);
    }
  }, [isRunning]);

  return (
    <Container>
      <LuTimerReset />
      <p>
        {formatTime(time)}
      </p>
    </Container>
  );
}

export default VideoTimer;

const Container = styled.div`
    ${styleMixin.Flex()}
    font-size: 1.8rem;
`;
