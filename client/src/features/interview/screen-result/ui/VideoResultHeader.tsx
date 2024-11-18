import { styled } from 'styled-components';

import { MainButton } from '@/src/shared/ui';
import { styleMixin } from '@/src/shared/styles';

type Props = {
  onCounterDecrease: () => void;
  onCounterIncrease: () => void;
  counter: number;
  progressStatus: string;
  lastVideo: number;
};

export default function VideoResultHeader({
  onCounterDecrease,
  onCounterIncrease,
  counter,
  progressStatus,
  lastVideo,
}: Props) {
  return (
    <VideoController>
      <MainButton
        label="<="
        onClick={onCounterDecrease}
        disabled={counter === 0}
      />
      <span>
        진행현황
        {progressStatus}
      </span>
      <MainButton
        label="=>"
        onClick={onCounterIncrease}
        disabled={lastVideo <= counter}
      />
    </VideoController>
  );
}

const VideoController = styled.div`
  ${styleMixin.Flex('space-between')};
  width: 100%;
  margin-bottom: 1rem;
  button {
    background-color: ${(props) => props.theme.colors.signatureColor};
  }
`;
