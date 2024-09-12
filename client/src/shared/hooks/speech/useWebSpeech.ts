/* eslint-disable no-param-reassign */
import { useState } from 'react';

const useWebSpeech = (speechList: string[], waitTime = 1000) => {
  const [speechData, setSpeechData] = useState<string[]>([...speechList]);

  const wait = (duration: number): Promise<void> => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });

  const waitSpeechEnd = (
    utterance: SpeechSynthesisUtterance,
  ): Promise<void> => new Promise((resolve) => {
    utterance.onend = () => {
      resolve();
    };
  });

  const readingTheScript = async (curIndex: number): Promise<void> => {
    if (curIndex < 0 || curIndex >= speechData.length) {
      throw new Error('Invalid index provided');
    }
    const utterance = new SpeechSynthesisUtterance(speechData[curIndex]);
    await wait(waitTime);
    window.speechSynthesis.speak(utterance);
    await waitSpeechEnd(utterance);
  };

  return {
    speechData,
    readingTheScript,
    setSpeechData,
  };
};

export default useWebSpeech;
