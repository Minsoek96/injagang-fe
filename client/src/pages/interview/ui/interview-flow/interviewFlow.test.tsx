import { render, screen } from '@testing-library/react';
import TestProvider from '@/fixutures/TestProvider';

import {
  useIntvContentStore,
  useIntvRecordStore,
} from '@/src/entities/interview_question';

import InterviewFlow from './InterviewFlow';

jest.mock('@/src/entities/interview_question', () => ({
  useIntvRecordStore: jest.fn(),
  useIntvContentStore: jest.fn(),
}));

jest.mock('@/src/features/interview', () => ({
  InterviewRecordingQueue: ({
    currentIndex,
  }: {
    currentIndex: number;
  }) => (
    <div data-testid="recording-queue">
      현재 인덱스:
      {' '}
      {currentIndex}
    </div>
  ),
  InterviewResultViewer: ({
    currentIndex,
  }: {
    currentIndex: number;
  }) => (
    <div data-testid="result-viewer">
      현재 인덱스:
      {' '}
      {currentIndex}
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

const mockUseIntvContentStore = (mode : string) => {
  (useIntvRecordStore as unknown as jest.Mock).mockImplementation((selector) => selector({
    interviewMode: mode,
    clearRecordStates: jest.fn(),
  }));
  (useIntvContentStore as unknown as jest.Mock).mockReturnValue(
    jest.fn(),
  );
};

const context = describe;
describe('InterviewFlow 컴포넌트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('렌더링 시나리오', () => {
    context('녹화 모드일 때', () => {
      beforeEach(() => {
        mockUseIntvContentStore('record');
      });

      it('InterviewRecordingQueue를 렌더링한다', () => {
        renderComponent();

        const recordingQueue = screen.getByTestId('recording-queue');
        expect(recordingQueue).toBeInTheDocument();
        expect(recordingQueue).toHaveTextContent('현재 인덱스: 0');
      });
    });

    context('결과 모드일 때', () => {
      beforeEach(() => {
        mockUseIntvContentStore('result');
      });

      it('InterviewResultViewer를 렌더링한다', () => {
        renderComponent();

        const resultViewer = screen.getByTestId('result-viewer');
        expect(resultViewer).toBeInTheDocument();
        expect(resultViewer).toHaveTextContent('현재 인덱스: -1');
      });
    });

    context('예외 모드일 때', () => {
      beforeEach(() => {
        mockUseIntvContentStore('unknown');
      });

      it('아무것도 렌더링하지 않는다', () => {
        const { container } = renderComponent();

        expect(container.firstChild).toBeEmptyDOMElement();
      });
    });
  });

  describe('언마운트 시 동작', () => {
    it('상태 정리 함수들을 호출한다', () => {
      const mockClearRecordContents = jest.fn();
      const mockClearRecordStates = jest.fn();

      (useIntvRecordStore as unknown as jest.Mock).mockImplementation((selector) => selector({
        interviewMode: 'record',
        clearRecordStates: mockClearRecordStates,
      }));

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
