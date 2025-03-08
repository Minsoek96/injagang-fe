import { act } from '@testing-library/react';

import {
  sampleCorrection,
} from '@/fixutures/entities/qnaboard';

import useCorrectionStore from './useCorrectionStore';

describe('useCorrectionStore', () => {
  it('유저가 첨삭한 정보를 저장한다.', () => {
    act(() => useCorrectionStore.getState().setCorrection(sampleCorrection));
    const { correction } = useCorrectionStore.getState();

    expect(correction.targetAnswer).toEqual(sampleCorrection.targetAnswer);
    expect(correction.targetQuestionIndex).toEqual(
      sampleCorrection.targetQuestionIndex,
    );
  });

  it('첨삭 정보를 초기화한다.', () => {
    act(() => useCorrectionStore.getState().initCorrection());
    const { correction } = useCorrectionStore.getState();

    expect(correction.targetAnswer).not.toEqual(sampleCorrection.targetAnswer);
  });
});
