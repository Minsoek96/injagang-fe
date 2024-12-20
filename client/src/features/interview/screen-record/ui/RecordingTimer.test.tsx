import { render, screen, act } from '@testing-library/react';
import TestProvider from '@/fixutures/TestProvider';

import { useRecordInfoStore } from '@/src/entities/interview_question';

import RecordingTimer from './RecordingTimer';

jest.mock('@/src/entities/interview_question', () => {
  const actualHooks = jest.requireActual('@/src/entities/interview_question');
  return {
    ...actualHooks,
    useRecordInfoStore: jest.fn(),
  };
});

const renderComponent = (isRunning = true) => {
  const utils = render(
    <TestProvider>
      <RecordingTimer isRunning={isRunning} />
    </TestProvider>,
  );
  return utils;
};

describe('RecordingTimer 컴포넌트 테스트', () => {
  let mockSetCurTimer: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSetCurTimer = jest.fn();
    (useRecordInfoStore as unknown as jest.Mock).mockReturnValue({
      setCurTimer: mockSetCurTimer,
    });
  });

  afterEach(() => {
    jest.useRealTimers(); // 타이머 설정 복구
  });

  it('타이머가 실행 중일 때 1초마다 증가한다', () => {
    jest.useFakeTimers();
    renderComponent();
    expect(screen.getByText('00:00')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('00:01')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText('00:03')).toBeInTheDocument();
  });

  it('타이머가 멈추면 setCurTimer가 호출되고 타이머가 초기화된다', () => {
    jest.useFakeTimers();

    const { rerender } = renderComponent(true);
    act(() => {
      jest.advanceTimersByTime(9000);
    });

    rerender(
      <TestProvider>
        <RecordingTimer isRunning={false} />
      </TestProvider>,
    );

    expect(mockSetCurTimer).toHaveBeenCalledWith('00:09');
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('isRunning이 false이고 8초 이하일 때 setCurTimer는 호출되지 않는다', () => {
    jest.useFakeTimers();
    renderComponent(false);

    act(() => {
      jest.advanceTimersByTime(7000);
    });

    expect(mockSetCurTimer).not.toHaveBeenCalled();
  });
});
