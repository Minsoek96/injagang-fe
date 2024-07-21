import { renderHook, act } from '@testing-library/react';
import React from 'react';
import useSectionObserver from './useSectionObserver';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));

describe('useSectionObserver', () => {
  let intersectionObserverMock = jest.fn();
  const observeMock = jest.fn();
  const disconnectMock = jest.fn();

  beforeEach(() => {
    intersectionObserverMock = jest.fn(() => ({
      observe: observeMock,
      disconnect: disconnectMock,
    }));

    window.IntersectionObserver = intersectionObserverMock;

    // 렌더링을 위한 Ref 설정
    const mockedUseRef = React.useRef as jest.Mock;
    mockedUseRef.mockReturnValueOnce({ current: Element });
  });

  const startObserver = (callback: jest.Mock) => {
    const options = 0.5;
    const { result, unmount } = renderHook(() =>
      useSectionObserver(callback, options));
    return { result, unmount };
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('감시 대상이 등록되면 감시를 시작한다.', () => {
    const callback = jest.fn();
    startObserver(callback);
    expect(observeMock).toHaveBeenCalled();
  });

  it('아이템이 교차할 때 콜백을 호출한다.', () => {
    const callback = jest.fn();
    startObserver(callback);

    act(() => {
      intersectionObserverMock.mock.calls[0][0]([{ isIntersecting: true }]);
    });

    expect(callback).toHaveBeenCalled();
  });

  it('아이템이 교차하지 않을 때 콜백을 호출하지 않는다.', () => {
    const callback = jest.fn();
    startObserver(callback);

    act(() => {
      intersectionObserverMock.mock.calls[0][0]([{ isIntersecting: false }]);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
