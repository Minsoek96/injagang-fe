import { renderHook, waitFor } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import { sampleResponseQuestions, sampleType } from '@/fixutures/entities/intervew_question';

import { getInterViewQuestionList } from './apis';
import { useFetchQuestions } from './queries';

jest.mock('./apis');

describe('useFetchQuestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('유저가 조회한 타입의 면접 리스트를 조회한다.', async () => {
    (getInterViewQuestionList as jest.Mock).mockResolvedValue({
      data: sampleResponseQuestions,
    });
    const { result } = renderHook(() => useFetchQuestions(sampleType), {
      wrapper: TestProvider,
    });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual({ data: sampleResponseQuestions });
  });
});
