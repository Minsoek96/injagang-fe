import { render, screen, act } from '@testing-library/react';
import TestProvider from '@/fixutures/TestProvider';

import { useIntvContentStore } from '@/src/entities/interview_question';

import { RecordStatus } from '@/src/shared/types';
import RecordingTimer from './RecordingTimer';

jest.mock('@/src/entities/interview_question', () => {
  const actualHooks = jest.requireActual('@/src/entities/interview_question');
  return {
    ...actualHooks,
    useIntvContentStore: jest.fn(),
  };
});

const renderComponent = (recordStatus: RecordStatus, isNarration = true) => render(
  <TestProvider>
    <RecordingTimer recordStatus={recordStatus} isNarration={isNarration} />
  </TestProvider>,
);

const mockIncreaseTimer = (time = 1000) => {
  act(() => {
    jest.advanceTimersByTime(time);
  });
};

const context = describe;

describe('RecordingTimer', () => {
  let mockSetCurTimer: jest.Mock;
  let mockCommitContent: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    mockSetCurTimer = jest.fn();
    mockCommitContent = jest.fn();

    (useIntvContentStore as unknown as jest.Mock).mockImplementation(
      (selector) =>
        selector({
          setCurTimer: mockSetCurTimer,
          commitContent: mockCommitContent,
        }),
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  context('타이머 초기 렌더링 시', () => {
    it('00:00으로 시작한다', () => {
      renderComponent('record');
      expect(screen.getByText('00:00')).toBeInTheDocument();
    });
  });

  context('나레이션이 진행 중일 때', () => {
    it('타이머가 1초마다 증가한다', () => {
      renderComponent('record');
      expect(screen.getByText('00:00')).toBeInTheDocument();

      mockIncreaseTimer(10000);
      expect(screen.getByText('00:10')).toBeInTheDocument();

      mockIncreaseTimer(50000);
      expect(screen.getByText('01:00')).toBeInTheDocument();
    });

    it('나레이션이 종료되어도 녹화가 진행 중이라면 타이머는 계속 증가한다', () => {
      const { rerender } = renderComponent('record');
      expect(screen.getByText('00:00')).toBeInTheDocument();

      mockIncreaseTimer(5000);
      expect(screen.getByText('00:05')).toBeInTheDocument();

      rerender(
        <TestProvider>
          <RecordingTimer recordStatus="record" isNarration={false} />
        </TestProvider>,
      );

      mockIncreaseTimer(1000);
      expect(screen.getByText('00:06')).toBeInTheDocument();
    });
  });

  context('녹화 상태에 따른 타이머 동작', () => {
    it('recordStatus가 end로 변경되면 setCurTimer와 commitContent가 순서대로 호출된다', () => {
      const { rerender } = renderComponent('record');
      mockIncreaseTimer(9000);

      rerender(
        <TestProvider>
          <RecordingTimer recordStatus="end" isNarration={false} />
        </TestProvider>,
      );

      expect(mockSetCurTimer).toHaveBeenCalledWith('00:09');
      expect(mockCommitContent).toHaveBeenCalledTimes(1);

      // 호출 순서 비교
      const setCurTimerCallIndex = mockSetCurTimer.mock.invocationCallOrder[0];
      const commitContentCallIndex = mockCommitContent.mock.invocationCallOrder[0];

      expect(setCurTimerCallIndex).toBeLessThan(commitContentCallIndex);
      expect(screen.getByText('00:00')).toBeInTheDocument();
    });

    it('recordStatus가 pause일 때 타이머가 증가하지 않는다', () => {
      const { rerender } = renderComponent('record');
      mockIncreaseTimer(3000);
      expect(screen.getByText('00:03')).toBeInTheDocument();

      rerender(
        <TestProvider>
          <RecordingTimer recordStatus="pause" isNarration={false} />
        </TestProvider>,
      );

      mockIncreaseTimer(5000);
      expect(screen.getByText('00:03')).toBeInTheDocument();
    });

    it('recordStatus가 pause일 때 setCurTimer와 commitContent는 호출되지 않는다', () => {
      renderComponent('pause');
      mockIncreaseTimer(7000);

      expect(mockSetCurTimer).not.toHaveBeenCalled();
      expect(mockCommitContent).not.toHaveBeenCalled();
    });
  });

  context('isNarration과 recordStatus 모두 false/pause일 때', () => {
    it('타이머가 증가하지 않는다', () => {
      renderComponent('pause', false);
      expect(screen.getByText('00:00')).toBeInTheDocument();

      mockIncreaseTimer(10000);
      expect(screen.getByText('00:00')).toBeInTheDocument();
    });
  });
});
