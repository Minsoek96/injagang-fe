import { act, renderHook, waitFor } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { useCorrectionStore } from '@/src/entities/qnaboard';

import useFeedBackLogic from '@/src/features/feedback-composer/model/useFeedBackLogic';

import { MODAL_MESSAGES } from '@/src/shared/const';
import { useModal } from '@/src/shared/hooks';
import { feedbackMutation } from '@/src/entities/feedback';

jest.mock('@/src/shared/hooks', () => {
  const actualHooks = jest.requireActual('@/src/shared/hooks');
  return {
    ...actualHooks,
    useModal: jest.fn(),
  };
});

jest.mock('@/src/entities/qnaboard');
jest.mock('@/src/entities/feedback', () => ({
  feedbackMutation: {
    useWriteFeed: jest.fn(),
  },
}));

const context = describe;
describe('useFeedBackLogic', () => {
  const mockSetModal = jest.fn();
  const mockMutate = jest.fn();
  const mockClear = jest.fn();

  const setMockCorrection = (mockCorrection: string = '') => {
    (useCorrectionStore as unknown as jest.Mock).mockReturnValue({
      correction: {
        targetAnswer: mockCorrection,
        targetQuestionIndex: 10001,
      },
      initCorrection: mockClear,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useModal as jest.Mock).mockReturnValue({
      setModal: mockSetModal,
    });

    (feedbackMutation.useWriteFeed as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });
  });
  context('모든 유효성 검사에 통과하는 경우', () => {
    it('피드백 작성을 요청하고 상태를 초기화한다.', async () => {
      const validAnswer = '유효한'.repeat(10);
      setMockCorrection('test');
      const { result } = renderHook(() => useFeedBackLogic(), {
        wrapper: TestProvider,
      });

      await act(() => {
        result.current.setFeedbackContent(validAnswer);
      });

      act(() => {
        result.current.handleSubmit();
      });

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledWith({
          qnaId: 10001,
          feedbackTarget: 'test',
          feedbackContent: validAnswer,
        });
        expect(mockClear).toHaveBeenCalled();
      });
    });
  });

  context('예외 유효성 검사', () => {
    it('첨삭된 내용이 없으면 경고메시지를 전달한다.', () => {
      setMockCorrection();

      const { result } = renderHook(() => useFeedBackLogic(), {
        wrapper: TestProvider,
      });

      act(() => {
        result.current.handleSubmit();
      });

      expect(mockSetModal).toHaveBeenCalledWith({
        contents: {
          title: MODAL_MESSAGES.WARNING,
          message: '첨삭 내용을 등록해주세요.',
        },
      });
    });

    it('피드백 내용이 30이하인 경우 경고 메시지를 전달한다.', () => {
      setMockCorrection('test');
      const { result } = renderHook(() => useFeedBackLogic(), {
        wrapper: TestProvider,
      });

      act(() => {
        result.current.handleSubmit();
      });

      expect(mockSetModal).toHaveBeenCalledWith({
        contents: {
          title: MODAL_MESSAGES.WARNING,
          message: '피드백은 30자 이상 작성해주세요.',
        },
      });
    });
  });
});
