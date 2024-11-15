import { act } from '@testing-library/react';

import useRecordInfoStore from './useRecordInfoStore';

const context = describe;
describe('useRecordInfoStore', () => {
  const renderRecordHook = () => {
    const states = useRecordInfoStore.getState();
    return states;
  };

  it('현재 녹화의 타이머를 기록한다..', () => {
    const sampleTimer = '00:05';
    act(() => useRecordInfoStore.getState().setCurTimer(sampleTimer));

    const { curTimer } = renderRecordHook();
    expect(curTimer).toBe(sampleTimer);
  });

  it('현재 녹화의 대본을 기록한다.', () => {
    const smapleScript = 'testScript';
    act(() => useRecordInfoStore.getState().setCurScript(smapleScript));
    const { curScript } = renderRecordHook();
    expect(curScript).toBe(smapleScript);
  });

  context('녹화가 종료되면', () => {
    it('현재 타이머와 녹화를 기록한다.', () => {
      const testInfo = {
        script: 'testScript',
        timer: '00:05',
      };
      act(() => useRecordInfoStore.getState().addRecordInfo(testInfo));
      const { recordInfoList } = renderRecordHook();
      expect(recordInfoList[0]).toBe(testInfo);
    });
  });
});
