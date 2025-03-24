import {
  act, render, screen, waitFor,
} from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';

import { useThemeStore } from '@/src/shared/store';
import InterviewLobby from './InterviewLobby';

jest.mock('@/src/shared/hooks', () => ({
  useInterval: (callback: () => void, delay: number | undefined) => {
    jest.useFakeTimers();
    setTimeout(callback, delay);
  },
}));

jest.mock('@/src/shared/store', () => ({
  useThemeStore: jest.fn(),
}));

jest.mock('@/public/assets/roomwhite.webp', () => '/roomwhite-mock');
jest.mock('@/public/assets/roomout.webp', () => '/roomdark-mock');

const context = describe;
const renderComponent = (isDark = false) => {
  (useThemeStore as unknown as jest.Mock).mockImplementation(() => ({
    isDark,
  }));
  render(
    <TestProvider>
      <InterviewLobby />
    </TestProvider>,
  );
};

const welcomeMessages = [
  '인자강 면접 시뮬레이션에 오신 것을 환영합니다.',
  '맞춤형 질문 세트로 자신만의 면접 환경을 구성해보세요.',
  '랜덤 질문 모드로 예상치 못한 상황에 대비할 수 있습니다.',
  '발음 인식 기능이 더 정확한 답변 연습을 도와드립니다.',
  'AI 피드백으로 면접 답변을 한 단계 높여보세요.',
];

describe('InterviewLobby', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('테마별 반응', () => {
    it('다크 모드이면 roomWhite이미지를 렌더링 한다.', () => {
      renderComponent(true);
      const image = screen.getByRole('img') as HTMLImageElement;
      expect(image.src).toContain('roomwhite');
    });

    it('라이트 모드이면 roomout이미지를 렌더링 한다.', () => {
      renderComponent(false);
      const image = screen.getByRole('img') as HTMLImageElement;
      expect(image.src).toContain('roomdark');
    });
  });

  context('첫 렌더링 후 3초가 지나면', () => {
    it('환영 메시지가 변화한다.', async () => {
      renderComponent();

      expect(screen.getByText(welcomeMessages[0])).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(screen.getByText(welcomeMessages[1])).toBeInTheDocument();
      });

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      await waitFor(() => {
        expect(screen.getByText(welcomeMessages[2])).toBeInTheDocument();
      });
    });
  });
});
