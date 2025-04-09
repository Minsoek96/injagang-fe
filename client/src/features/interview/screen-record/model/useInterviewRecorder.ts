import { useEffect } from 'react';

import {
  useDeviceStore,
  useIntvRecordStore,
} from '@/src/entities/interview_question';
import { useMediaRecord } from '@/src/shared/hooks';

/**
 * 면접 녹화와 관련된 처리를 담당하는 훅
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
  // 녹화 관련 제어 정보 저장
  const {
    setRecordedChunks,
    setInterviewMode,
    recordedChunks: storeChunks,
  } = useIntvRecordStore();

  // 유저가 선택한 디바이스
  const { audioDevice, videoDevice } = useDeviceStore();

  // 녹화 관련 제어
  const {
    videoRef,
    handleRecord,
    handlePauseRecord,
    handleResumeRecord,
    handleRecordRemove,
    recordStatus,
    recordedChunks: currentChunks,
  } = useMediaRecord({
    audioId: audioDevice?.deviceId,
    videoId: videoDevice?.deviceId,
  });

  // 녹화 완료 시 청크 데이터를 저장하여 동기화 목적
  useEffect(() => {
    if (recordStatus === 'end') {
      setRecordedChunks(currentChunks);
    }
  }, [currentChunks, recordStatus]);

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
