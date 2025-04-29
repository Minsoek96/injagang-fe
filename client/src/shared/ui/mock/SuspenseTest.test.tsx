import { Suspense } from 'react';
import { render, screen, act } from '@testing-library/react';
import SuspenseTest from './SuspenseTest';

describe('SuspenseTest', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('지연 후 메시지를 표시한다.', async () => {
    render(
      <Suspense fallback={<div>로딩 중...</div>}>
        <SuspenseTest delay={2000} message="테스트 메시지" />
      </Suspense>,
    );

    expect(screen.getByText('로딩 중...')).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText('테스트 메시지')).toBeInTheDocument();
  });
});
