import { useEffect } from 'react';

import { useRecordInfoStore } from '@/src/entities/interview_question';
import { useMediaRecord } from '@/src/shared/hooks';

/**
 * useInterviewRecorder : 면접 녹화를 위한 훅
 *
 * @returns :
 * - videoRef: 비디오 DOM 요소에 대한 참조
 * - handleRecord: 녹화를 시작하는 함수
 * - handlePauseRecord: 녹화를 일시 정지하는 함수
 * - handleResumeRecord: 녹화를 재개하는 함수
 * - handleRecordRemove: 녹화된 데이터를 삭제하는 함수
 * - setInterviewMode: 인터뷰 모드를 설정하는 함수
 * - storeChunks: 저장된 녹화 청크 데이터
 * - recordStatus: 현재 녹화 상태 ("pending" | "record" | "pause")
 */
export default function useInterviewRecorder() {
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
  }, [recordedChunks]);

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
