import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import StepMarker from './StepMarker';

const renderStepMarker = (currentStep: number, index: number) => {
  const step = { title: 'Step Title', id: 'step-1' };
  return render(
    <TestProvider>
      <StepMarker
        stepTitle={step.title}
        currentStep={currentStep}
        index={index}
      />
    </TestProvider>,
  );
};

describe('StepMarker', () => {
  it('단계 제목이 올바르게 렌더링된다.', () => {
    renderStepMarker(0, 0);
    expect(screen.getByText('Step.1')).toBeInTheDocument();
    expect(screen.getByText(':Step Title')).toBeInTheDocument();
  });

  it('currentStep이 index보다 클 때 완료된 스타일이 적용된다.', () => {
    renderStepMarker(1, 0);
    const marker = screen.getByTestId('marker');
    expect(marker).toHaveStyleRule('background-color', '#0F766E');
    expect(marker).toHaveStyleRule('color', '#0f1419');
  });

  it('currentStep이 index보다 작을 때 기본스타일이 적용된다.', () => {
    renderStepMarker(1, 3);
    const marker = screen.getByTestId('marker');
    expect(marker).toHaveStyleRule('background-color', 'none');
    expect(marker).toHaveStyleRule('animation', expect.anything());
  });
});
