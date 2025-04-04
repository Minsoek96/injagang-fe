import { interviewMutation } from '@/src/entities/interview_question';
import useIntvFeedback from '@/src/features/interview/screen-result/model/useIntvFeedback';
import { act, renderHook, waitFor } from '@testing-library/react';

jest.mock('@/src/entities/interview_question', () => ({
  interviewMutation: {
    useGetIntvFeedback: jest.fn(),
  },
}));

const context = describe;

describe('useIntvFeedback', () => {
  const mockRecordContent = {
    voiceScript: `${'Mock Voice Script'.repeat(6)}`,
    script: `${'Mock Script'.repeat(6)}`,
    timer: '00:30',
    rating: '',
  };

  const mockQuestion = 'Mock Question';
  const mockCounter = 0;
  const mockOnClose = jest.fn();
  const mockRequestFeedback = jest.fn();

  const mockRenderHook = (
    mockRecord: typeof mockRecordContent = mockRecordContent,
  ) => {
    const hooks = renderHook(() =>
      useIntvFeedback({
        recordContent: mockRecord,
        question: mockQuestion,
        counter: mockCounter,
        onClose: mockOnClose,
      }));
    return hooks;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (interviewMutation.useGetIntvFeedback as jest.Mock).mockReturnValue({
      mutateAsync: mockRequestFeedback,
      isPending: false,
    });
  });

  context('초기 상태일 때', () => {
    it('기본값이 설정된다.', () => {
      const { result } = mockRenderHook();
      expect(result.current.selectedSource).toBe('voice');
      expect(result.current.errorMsg).toBe('');
      expect(result.current.isPending).toBe(false);
      expect(result.current.getSelectedText).toBe(
        mockRecordContent.voiceScript,
      );
    });
  });

  context('스크립트 타입을 결정할 때', () => {
    it('선택된 소스와 텍스트가 업데이트 된다.', () => {
      const { result } = mockRenderHook();
      expect(result.current.selectedSource).toBe('voice');
      expect(result.current.getSelectedText).toBe(
        mockRecordContent.voiceScript,
      );

      act(() => {
        result.current.changeSelectedSource('script');
      });

      expect(result.current.selectedSource).toBe('script');
      expect(result.current.getSelectedText).toBe(mockRecordContent.script);
    });
  });

  context('피드백 요청시 취소되는 경우', () => {
    it('질문이나 답변이 비어있는 경우 오류메시지가 설정된다.', () => {
      const mockEmptyContent = {
        voiceScript: '',
        script: '',
        timer: '',
        rating: '',
      };
      const { result } = mockRenderHook(mockEmptyContent);

      act(() => {
        result.current.handleRequestFeedback();
      });

      expect(result.current.errorMsg).toBe(
        '질문와 답변이 비어있는 경우 피드백을 요청할 수 없습니다.',
      );
      expect(mockRequestFeedback).not.toHaveBeenCalled();
    });
    it('30자 이하의 소스코드를 요청하면 오류메시지가 설정된다', () => {
      const mockContent = {
        voiceScript: 'mock voice script',
        script: 'mock script',
        timer: '00:00',
        rating: '',
      };
      const { result } = mockRenderHook(mockContent);

      act(() => {
        result.current.handleRequestFeedback();
      });

      expect(result.current.errorMsg).toBe(
        '30자 이상의 소스만 분석할 수 있습니다.',
      );
      expect(mockRequestFeedback).not.toHaveBeenCalled();
    });
    it('등급이 설정된 경우는 오류메시지가 설정된다', () => {
      const mockPrevContent = {
        voiceScript: `${'Mock Voice Script'.repeat(6)}`,
        script: `${'Mock Script'.repeat(6)}`,
        timer: '00:30',
        rating: '우수함',
      };

      const { result } = mockRenderHook(mockPrevContent);

      act(() => {
        result.current.handleRequestFeedback();
      });

      expect(result.current.errorMsg).toBe(
        '이미 AI 분석 요청 결과가 존재합니다.',
      );
      expect(mockRequestFeedback).not.toHaveBeenCalled();
    });
  });

  context('피드백 요청 성공시', () => {
    it('onClose 함수를 호출한다.', async () => {
      const { result } = mockRenderHook(mockRecordContent);

      act(() => {
        result.current.handleRequestFeedback();
      });

      expect(mockRequestFeedback).toHaveBeenCalled();
      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });
  });

  context('분석 도중 오류가 발생하면', () => {
    it('에러 메시지를 설정한다.', async () => {
      (mockRequestFeedback as jest.Mock).mockRejectedValue(
        new Error('API Error'),
      );

      const { result } = mockRenderHook(mockRecordContent);
      act(() => {
        result.current.handleRequestFeedback();
      });

      expect(mockRequestFeedback).toHaveBeenCalled();
      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
        expect(result.current.errorMsg).toBe('피드백 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
      });
    });
  });

  context('질문이나 답변이 비어있는 경우', () => {
    it('getSelectedText에 기록 되지 않았음을 전달한다.', async () => {
      const mockEmptyContent = {
        voiceScript: '',
        script: '',
        timer: '',
        rating: '',
      };
      const { result } = mockRenderHook(mockEmptyContent);

      expect(result.current.getSelectedText).toBe('음성 변환 기록이 없습니다.');

      act(() => result.current.changeSelectedSource('script'));

      await waitFor(() => {
        expect(result.current.getSelectedText).toBe('작성한 대본이 없습니다.');
      });
    });
  });
});
