import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { LuTimerReset } from 'react-icons/lu';

import { useRecordInfoStore } from '@/src/entities/interview_question';
import { styleMixin } from '@/src/shared/styles';
import { useInterval } from '@/src/shared/hooks';
import { formatTime } from '@/src/shared/utils';

type Props = {
    isRunning: boolean;
};

export default function RecordingTimer({ isRunning }: Props) {
  const { setCurTimer } = useRecordInfoStore();
  const [time, setTime] = useState(0);

  useInterval(
    () => {
      setTime((timer) => timer + 1);
    },
    isRunning ? 1000 : null,
  );

  useEffect(() => {
    if (!isRunning && time > 8) {
      setCurTimer(formatTime.mmss(time));
      setTime(0);
    }
  }, [isRunning, setCurTimer, time]);

  return (
    <Container>
      <LuTimerReset />
      <p>
        {formatTime.mmss(time)}
      </p>
    </Container>
  );
}

const Container = styled.div`
    ${styleMixin.Flex()}
    font-size: 1.8rem;
`;
