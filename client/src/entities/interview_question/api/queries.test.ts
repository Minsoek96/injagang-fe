import { renderHook, waitFor } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import {
  sampleResponseQuestions,
  sampleType,
} from '@/fixutures/entities/intervew_question';

import useIntvPlaylistStore from '@/src/entities/interview_question/model/useIntvPlaylistStore';

import { getInterViewQuestionList } from './apis';
import { useFetchQuestions } from './queries';

jest.mock('./apis');
jest.mock('@/src/entities/interview_question/model/useIntvPlaylistStore');

describe('useFetchQuestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useIntvPlaylistStore as unknown as jest.Mock).mockReturnValue({
      selectedType: sampleType,
    });

    (getInterViewQuestionList as jest.Mock).mockResolvedValue(sampleResponseQuestions);
  });

  it('유저가 조회한 타입의 면접 리스트를 조회한다.', async () => {
    const { result } = renderHook(() => useFetchQuestions(), {
      wrapper: TestProvider,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(sampleResponseQuestions);
    expect(getInterViewQuestionList).toHaveBeenCalledWith(sampleType);
  });
});
