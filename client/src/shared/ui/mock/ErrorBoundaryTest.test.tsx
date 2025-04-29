import TestProvider from '@/fixutures/TestProvider';

import { render, act } from '@testing-library/react';

import ErrorBoundaryTest from './ErrorBoundaryTest';

describe('ErrorBoundaryTest', () => {
  const renderComponent = (delay: number) => {
    const util = render(
      <TestProvider>
        <ErrorBoundaryTest delay={delay} />
      </TestProvider>,
    );

    return util;
  };

  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  it('지연 후 에러가 발생한다.', () => {
    expect(() => {
      renderComponent(1000);

      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }).toThrow();
  });

  it('지연 중 에러는 발생하지않는다.', () => {
    expect(() => {
      renderComponent(3000);

      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }).not.toThrow();
  });
});
