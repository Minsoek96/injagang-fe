import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import RecordingStatusHeader from '@/src/features/interview/screen-record/ui/RecordingStatusHeader';

describe('RecordingStatusHeader', () => {
  const renderComponent = (
    isRecord: boolean = false,
    isSpeaking: boolean = false,
    currentQuestion: string = 'Mock Question',
  ) => {
    const utils = render(
      <TestProvider>
        <RecordingStatusHeader
          isRecord={isRecord}
          isSpeaking={isSpeaking}
          currentQuestion={currentQuestion}
        />
      </TestProvider>,
    );
    return utils;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('녹화 상태에 따라 올바른 메시지를 렌더링한다.', () => {
    it('녹화가 대기 중이라면 "대기상태" 메시지가 표시된다.', () => {
      renderComponent();
      expect(screen.getByText(/대기상태/)).toBeInTheDocument();
    });

    it('녹화가 진행 중이라면 "녹화중" 메시지가 표시된다.', () => {
      renderComponent(true);
      expect(screen.getByText(/녹화중/)).toBeInTheDocument();
    });
  });

  describe('스피칭 상태에 따라 안내 메시지를 렌더링한다.', () => {
    it('스피칭이 시작되지 않았다면 "타이머 안내 메시지"가 표시된다.', () => {
      renderComponent(true, true);
      expect(screen.getByText(/타이머가 3초가 되면 스피칭이 진행됩니다/)).toBeInTheDocument();
    });

    it('스피칭이 끝났다면 현재 질문이 표시된다.', () => {
      renderComponent(true, false);
      expect(screen.getByText(/Mock Question/)).toBeInTheDocument();
    });
  });
});
