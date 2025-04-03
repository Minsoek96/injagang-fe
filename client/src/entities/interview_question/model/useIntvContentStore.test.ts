import { act } from '@testing-library/react';

import useIntvContentStore from './useIntvContentStore';

const context = describe;
describe('useIntvContentStore', () => {
  const renderRecordHook = () => {
    const states = useIntvContentStore.getState();
    return states;
  };

  const mockData = {
    script: 'mockScript',
    timer: '00:05',
    voiceScript: 'mockVoice',
  };

  it('현재 녹화의 타이머를 기록한다..', () => {
    act(() => useIntvContentStore.getState().setCurTimer(mockData.timer));

    const { curTimer } = renderRecordHook();
    expect(curTimer).toBe(mockData.timer);
  });

  it('현재 녹화의 대본을 기록한다.', () => {
    act(() => useIntvContentStore.getState().setCurScript(mockData.script));
    const { curScript } = renderRecordHook();
    expect(curScript).toBe(mockData.script);
  });

  context('녹화가 종료되면', () => {
    it('현재 타이머와 녹화를 기록한다.', () => {
      act(() => {
        useIntvContentStore.getState().setCurScript(mockData.script);
        useIntvContentStore.getState().setCurTimer(mockData.timer);
        useIntvContentStore.getState().setCurVoiceScript(mockData.voiceScript);
      });
      act(() => useIntvContentStore.getState().commitContent());
      const { recordContents } = renderRecordHook();
      expect(recordContents[0]).toEqual(expect.objectContaining(mockData));
    });
  });
});
