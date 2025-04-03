import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { LuTimerReset } from 'react-icons/lu';

import { useIntvContentStore } from '@/src/entities/interview_question';

import { styleMixin } from '@/src/shared/styles';
import { useInterval } from '@/src/shared/hooks';
import { formatTime } from '@/src/shared/utils';
import { RecordStatus } from '@/src/shared/types';

type Props = {
  recordStatus: RecordStatus;
  isNarration: boolean;
};

export default function RecordingTimer({ recordStatus, isNarration }: Props) {
  const [time, setTime] = useState(0);
  const isRunning = isNarration || recordStatus === 'record';

  const commitContent = useIntvContentStore((state) => state.commitContent);
  const setCurTimer = useIntvContentStore((state) => state.setCurTimer);

  useInterval(
    () => {
      setTime((timer) => timer + 1);
    },
    isRunning ? 1000 : null,
  );

  useEffect(() => {
    if (recordStatus === 'end' && time > 0) {
      setCurTimer(formatTime.mmss(time));
      commitContent();
      setTime(0);
    }
  }, [setCurTimer, time, recordStatus, commitContent]);

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
