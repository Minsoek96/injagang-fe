import { useCallback, useState } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import useWhyDidYouRender from '@/src/shared/hooks/whydr/useWhyDidYouRender';

const context = describe;
const renderComponent = (value = 0, mockValue = 3, isMemo = false) =>
  render(
    <MockComponent initValue={value} mockValue={mockValue} isMemo={isMemo} />,
  );
describe('useWhyDidYouRender', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const capture: any = {
    log: jest.spyOn(console, 'log'),
    group: jest.spyOn(console, 'group'),
    groupEnd: jest.spyOn(console, 'groupEnd'),
    table: jest.spyOn(console, 'table'),
  };
  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(process, 'env', {
      value: { ...process.env, NODE_ENV: 'development' },
    });

    capture.log.mockImplementation();
    capture.group.mockImplementation();
    capture.groupEnd.mockImplementation();
    capture.table.mockImplementation();
  });

  context('초기 렌더링 시', () => {
    it('로그가 출력되지 않아야 한다.', () => {
      renderComponent();

      expect(capture.log).not.toHaveBeenCalled();
      expect(capture.group).not.toHaveBeenCalled();
      expect(capture.groupEnd).not.toHaveBeenCalled();
    });
  });

  context('state가 변경될 때', () => {
    it('변경된 state 내용을 기록 한다.', () => {
      renderComponent();

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(capture.table.mock.calls[0][0]).toEqual({
        value: { 이전: 0, 현재: 1 },
      });
    });

    it('state 값이 변경되면 해당 변경 사항만 기록한다', () => {
      const { rerender } = renderComponent(0, 3);
      rerender(<MockComponent initValue={0} mockValue={5} isMemo={false} />);

      expect(capture.table.mock.calls[0][0]).toEqual({
        mockValue: { 이전: 3, 현재: 5 },
      });
    });
  });

  context('action이 변경되면', () => {
    it('변경된 action값을 기록한다', () => {
      const { rerender } = renderComponent(0, 0);
      rerender(<MockComponent initValue={0} mockValue={0} />);

      expect(capture.table.mock.calls[0][0]).toEqual({
        handleIncrease: {
          이전: expect.any(Function),
          현재: expect.any(Function),
        },
      });
    });

    it('메모이제이션된 action값은 기록되지 않는다.', () => {
      const { rerender } = renderComponent(0, 0, true);
      rerender(<MockComponent initValue={0} mockValue={0} isMemo />);
      expect(capture.table).not.toHaveBeenCalled();
    });
  });

  context('값의 변화는 없지만 부모의 리렌더링', () => {
    it('부모로 인한 리렌더링임을 유추하여 기록한다.', () => {
      const { rerender } = renderComponent(0, 0, true);
      rerender(<MockComponent initValue={0} mockValue={5} isMemo />);
      expect(capture.log.mock.calls[0][0]).toMatch(/부모 리렌더링/);
    });
  });

  context('환경에 따른 동작', () => {
    it('production 환경에서는 로깅하지 않는다', () => {
      Object.defineProperty(process, 'env', {
        value: { ...process.env, NODE_ENV: 'production' },
      });

      renderComponent();
      fireEvent.click(screen.getByRole('button'));
      expect(capture.log).not.toHaveBeenCalled();
      expect(capture.group).not.toHaveBeenCalled();
      expect(capture.groupEnd).not.toHaveBeenCalled();
    });
  });
});

// 테스트 코드 점검을 위한 모킹 컴포넌트
function MockComponent({
  initValue,
  mockValue = 3,
  isMemo = false,
}: {
  initValue: number;
  mockValue?: number;
  isMemo?: boolean;
}) {
  const [counter, setCounter] = useState<number>(initValue);

  const mockIncrease = () => {
    setCounter((prev) => prev + 1);
  };

  const memoIncrease = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, []);

  const handleIncrease = isMemo ? memoIncrease : mockIncrease;

  useWhyDidYouRender('Parent', { counter, mockValue }, { handleIncrease });
  return (
    <div>
      <div>
        Mock :
        {counter}
      </div>
      <button type="button" onClick={handleIncrease}>
        증가
      </button>
      <MockChild value={counter} />
    </div>
  );
}
function MockChild({ value }: { value: number }) {
  useWhyDidYouRender('Child', { value }, {});
  return (
    <div>
      child:
      {value}
    </div>
  );
}
