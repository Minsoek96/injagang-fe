import { useCallback, useEffect } from 'react';

import { useIntvContentStore } from '@/src/entities/interview_question';

type Props = {
  recordStatus: 'pending' | 'record' | 'pause';
};
const useIntvContentSaver = ({ recordStatus }: Props) => {
  const {
    curTimer,
    addRecordContent,
    clearCurContent,
  } = useIntvContentStore();

  const recordingContent = useCallback(() => {
    addRecordContent();
    clearCurContent();
  }, []);

  useEffect(() => {
    if (recordStatus === 'pending' && curTimer) {
      recordingContent();
    }
  }, [recordStatus, curTimer, recordingContent]);
};

export default useIntvContentSaver;
