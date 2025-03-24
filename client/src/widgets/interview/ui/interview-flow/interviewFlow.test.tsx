import { render, screen } from '@testing-library/react';
import TestProvider from '@/fixutures/TestProvider';

import {
  useIntvContentStore,
  useIntvRecordStore,
} from '@/src/entities/interview_question';

import InterviewFlow from './InterviewFlow';

jest.mock('@/src/entities/interview_question', () => ({
  useIntvPlaylistStore: jest.fn(() => ({
    userPlayList: [
      { id: 1, question: '첫 번째 질문' },
      { id: 2, question: '두 번째 질문' },
    ],
  })),
  // TODO : 통합 스토어 처리
  useIntvRecordStore: jest.fn(() => ({
    interviewMode: 'record',
  })),

  useIntvContentStore: jest.fn(() => jest.fn()),
}));

jest.mock('@/src/shared/hooks', () => ({
  useWebSpeech: () => ({
    readingTheScript: true,
    speechData: ['테스트 질문1', '테스트 질문2', '테스트 질문3'],
  }),
}));

jest.mock('@/src/features/interview', () => ({
  InterviewRecordingQueue: ({
    currentIndex,
    speechData,
  }: {
    currentIndex: number;
    speechData: string[];
  }) => (
    <div data-testid="recording-queue">
      현재 인덱스:
      {' '}
      {currentIndex}
      질문:
      {' '}
      {speechData[currentIndex]}
    </div>
  ),
  InterviewResultViewer: ({
    currentIdx,
    question,
  }: {
    currentIdx: number;
    question: string[];
  }) => (
    <div data-testid="result-viewer">
      현재 인덱스:
      {' '}
      {currentIdx}
      질문:
      {' '}
      {question[currentIdx + 1]}
    </div>
  ),
}));

const renderComponent = () => {
  const util = render(
    <TestProvider>
      <InterviewFlow />
    </TestProvider>,
  );
  return util;
};

const context = describe;

describe('InterviewFlow 컴포넌트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('렌더링 시나리오', () => {
    context('녹화 모드일 때', () => {
      beforeEach(() => {
        (useIntvRecordStore as unknown as jest.Mock).mockReturnValue({
          interviewMode: 'record',
          clearRecordStates: jest.fn(),
        });

        (useIntvContentStore as unknown as jest.Mock).mockReturnValue(
          jest.fn(),
        );
      });

      it('InterviewRecordingQueue를 렌더링한다', () => {
        renderComponent();

        const recordingQueue = screen.getByTestId('recording-queue');
        expect(recordingQueue).toBeInTheDocument();
        expect(recordingQueue).toHaveTextContent('현재 인덱스: 0');
        expect(recordingQueue).toHaveTextContent('질문: 테스트 질문');
      });
    });

    context('결과 모드일 때', () => {
      beforeEach(() => {
        (useIntvRecordStore as unknown as jest.Mock).mockReturnValue({
          interviewMode: 'result',
          clearRecordStates: jest.fn(),
        });

        (useIntvContentStore as unknown as jest.Mock).mockReturnValue(
          jest.fn(),
        );
      });

      it('InterviewResultViewer를 렌더링한다', () => {
        renderComponent();

        const resultViewer = screen.getByTestId('result-viewer');
        expect(resultViewer).toBeInTheDocument();
        expect(resultViewer).toHaveTextContent('현재 인덱스: -1');
        expect(resultViewer).toHaveTextContent('질문: 테스트 질문');
      });
    });

    context('예외 모드일 때', () => {
      beforeEach(() => {
        (useIntvRecordStore as unknown as jest.Mock).mockReturnValue({
          interviewMode: 'unknow',
          clearRecordStates: jest.fn(),
        });

        (useIntvContentStore as unknown as jest.Mock).mockReturnValue(
          jest.fn(),
        );
      });

      it('아무것도 렌더링하지 않는다', () => {
        const { container } = renderComponent();

        expect(container.firstChild).toBeEmptyDOMElement();
      });
    });
  });

  describe('언마운트 시 동작', () => {
    it('initRecordInfoList를 호출한다', () => {
      const mockClearRecordContents = jest.fn();
      const mockClearRecordStates = jest.fn();

      (useIntvRecordStore as unknown as jest.Mock).mockReturnValue({
        interviewMode: 'record',
        clearRecordStates: mockClearRecordStates,
      });

      (useIntvContentStore as unknown as jest.Mock).mockReturnValue(
        mockClearRecordContents,
      );

      const { unmount } = renderComponent();

      unmount();

      expect(mockClearRecordContents).toHaveBeenCalled();
      expect(mockClearRecordStates).toHaveBeenCalled();
    });
  });
});
