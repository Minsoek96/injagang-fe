import { useEffect } from 'react';

import { useRecordInfoStore } from '@/src/entities/interview_question';
import { useMediaRecord } from '@/src/shared/hooks';

export default function useVideoPlayerLogic() {
  const {
    setRecordedChunks,
    curScript,
    curTimer,
    addRecordInfo,
    initCurinfos,
    setInterviewMode,
    recordedChunks: storeChunks,
    audioDevice,
    videoDevice,
  } = useRecordInfoStore();

  const {
    videoRef,
    handleRecord,
    handlePauseRecord,
    handleResumeRecord,
    handleRecordRemove,
    recordStatus,
    recordedChunks,
  } = useMediaRecord({
    audioId: audioDevice?.deviceId,
    videoId: videoDevice?.deviceId,
  });

  useEffect(() => {
    setRecordedChunks(recordedChunks);
  }, [recordedChunks, setRecordedChunks]);

  useEffect(() => {
    const recordingResults = () => {
      addRecordInfo({ timer: curTimer ?? '', script: curScript ?? '' });
      initCurinfos();
    };
    if (recordStatus === 'pending' && curTimer) {
      recordingResults();
    }
  }, [curTimer, curScript, addRecordInfo, initCurinfos, recordStatus]);

  return {
    videoRef,
    handleRecord,
    handlePauseRecord,
    handleResumeRecord,
    handleRecordRemove,
    setInterviewMode,
    storeChunks,
    recordStatus,
  };
}
