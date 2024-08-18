import { render, screen } from '@testing-library/react';

import { sampleStepList } from '@/fixutures/shared';
import StepProgressBar from '@/src/shared/components/progressbar/StepProgressBar';

import TestProvider from '@/fixutures/TestProvider';

describe('StepProgressBar', () => {
  const renderProgressBar = () => {
    render(
      <TestProvider>
        <StepProgressBar
          stepList={sampleStepList}
          currentStep={5}
          itemToText={(value) => value.title}
          itemToid={(value) => value.id}
        />
      </TestProvider>,
    );
  };
  it('단계별 진행도를 나타내는 바가 렌더링된다.', () => {
    renderProgressBar();
    sampleStepList.forEach((item) => {
      const stepText = screen.getByText(new RegExp(item.title));
      expect(stepText).toBeInTheDocument();
    });
  });
});
