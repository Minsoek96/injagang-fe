type ResultStateProps = {
    video: Blob[];
    recordContents: {
      script: string;
      timer: string;
      voiceScript: string;
    }[];
    question: string[];
    counter: number;
  };

export type { ResultStateProps };
