import styled from 'styled-components';

import StepMarker from '@/src/shared/components/progressbar/StepMarker';

type Props = {
  stepList: { title: string; id: string }[];
  currentStep: number;
};

function StepProgressBar({ stepList, currentStep }: Props) {
  return (
    <ProgressBar>
      {stepList.map((step, index) => (
        <StepMarker
          key={step.id}
          step={step}
          index={index}
          currentStep={currentStep}
        />
      ))}
    </ProgressBar>
  );
}

export default StepProgressBar;

const ProgressBar = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem
`;
