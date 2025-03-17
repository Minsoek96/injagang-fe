import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { LuTimerReset } from 'react-icons/lu';

import { useIntvContentStore } from '@/src/entities/interview_question';
import { styleMixin } from '@/src/shared/styles';
import { useInterval } from '@/src/shared/hooks';
import { formatTime } from '@/src/shared/utils';

type Props = {
  isRunning: boolean;
};

export default function RecordingTimer({ isRunning }: Props) {
  const { setCurTimer } = useIntvContentStore();
  const [time, setTime] = useState(0);

  useInterval(
    () => {
      setTime((timer) => timer + 1);
    },
    isRunning ? 1000 : null,
  );

  /**
   * TODO : 스피칭 끊기면 isRuning이 아닌 상태가 된다.
   * isRuning을 끊겼을 때 타임이 넉넉하지 않으면 currentTime이 초기화가 발생한다.
   */
  // TODO : 스피칭이 끊기면 isRuning이 아닌 상태가 된다.
  useEffect(() => {
    if (!isRunning && time > 8) {
      setCurTimer(formatTime.mmss(time));
      setTime(0);
    }
  }, [isRunning, setCurTimer, time]);

  return (
    <Container>
      <LuTimerReset />
      <TimeDisplay>{formatTime.mmss(time)}</TimeDisplay>
    </Container>
  );
}

const Container = styled.div`
  ${styleMixin.Flex('flex-end', '')}
  font-size: 1.8rem;
  min-width: 8rem;
  gap:0.5rem;
`;

const TimeDisplay = styled.p`
  font-family: monospace;
`;
