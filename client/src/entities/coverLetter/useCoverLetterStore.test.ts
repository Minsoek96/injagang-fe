import { act } from '@testing-library/react';

import { emptyCoverLetter, sampleCoverLetter } from '@/fixutures/entities/coverLetter';

import useCoverLetterStore from '@/src/entities/coverLetter/useCoverLetterStore';

describe('useCoverLetterStore', () => {
  it('선택된 자소서 세부목록을 저장한다.', () => {
    act(() => useCoverLetterStore.getState().setCoverLetter(sampleCoverLetter));

    const { selectedCoverLetter } = useCoverLetterStore.getState();
    expect(selectedCoverLetter).toEqual(sampleCoverLetter);
  });

  it('선택된 자소서 세부목록을 초기화한다.', () => {
    act(() => useCoverLetterStore.getState().initCoverLetter());

    const { selectedCoverLetter } = useCoverLetterStore.getState();
    expect(selectedCoverLetter).not.toEqual(sampleCoverLetter);
    expect(selectedCoverLetter).toEqual(emptyCoverLetter);
  });
});
