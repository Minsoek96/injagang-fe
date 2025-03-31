/* eslint-disable no-param-reassign */
import { useCallback, useState } from 'react';

const useWebSpeech = (speechList: string[], waitTime = 1000) => {
  const [speechData, setSpeechData] = useState<string[]>([...speechList]);

  const wait = useCallback((duration: number): Promise<void> => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  }), []);

  const waitSpeechEnd = useCallback((
    utterance: SpeechSynthesisUtterance,
  ): Promise<void> => new Promise((resolve) => {
    utterance.onend = () => {
      resolve();
    };
  }), []);

  const readingTheScript = useCallback(async (curIndex: number): Promise<void> => {
    if (curIndex < 0 || curIndex >= speechData.length) {
      throw new Error('Invalid index provided');
    }
    const utterance = new SpeechSynthesisUtterance(speechData[curIndex]);
    await wait(waitTime);
    window.speechSynthesis.speak(utterance);
    await waitSpeechEnd(utterance);
  }, [speechData, waitTime, wait, waitSpeechEnd]);

  return {
    speechData,
    readingTheScript,
    setSpeechData,
  };
};

export default useWebSpeech;
