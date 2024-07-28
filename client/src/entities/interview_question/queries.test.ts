import { sampleResponseQuestions, sampleType } from '@/fixutures/entities/intervew_question';
import TestProvider from '@/fixutures/TestProvider';
import { getInterViewQuestionList } from '@/src/entities/interview_question/apis';
import { useFetchQuestions } from '@/src/entities/interview_question/queries';
import { renderHook, waitFor } from '@testing-library/react';

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
