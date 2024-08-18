import styled from 'styled-components';

import StepMarker from '@/src/shared/components/progressbar/StepMarker';

type Props<T> = {
  stepList: T[];
  currentStep: number;
  itemToid: (item: T) => string;
  itemToText: (item: T) => string;
};

function StepProgressBar<T>({
  stepList,
  currentStep,
  itemToText,
  itemToid,
}: Props<T>) {
  return (
    <ProgressBar>
      {stepList.map((step, index) => (
        <StepMarker
          key={itemToid(step)}
          stepTitle={itemToText(step)}
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
  gap: 1rem;
`;
