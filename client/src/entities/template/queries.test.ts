import { sampleResponseQuestions } from '@/fixutures/entities/intervew_question';
import TestProvider from '@/fixutures/TestProvider';

import { getTemplate } from '@/src/entities/template/apis';
import { useFetchTemplate } from '@/src/entities/template/queries';
import { renderHook, waitFor } from '@testing-library/react';

jest.mock('./apis');

describe('useFetchQuestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('템플릿을 조회한다.', async () => {
    (getTemplate as jest.Mock).mockResolvedValue({
      data: sampleResponseQuestions,
    });
    const { result } = renderHook(() => useFetchTemplate(), {
      wrapper: TestProvider,
    });

    await waitFor(() =>
      expect(result.current.data).toEqual({ data: sampleResponseQuestions }));
  });
});
