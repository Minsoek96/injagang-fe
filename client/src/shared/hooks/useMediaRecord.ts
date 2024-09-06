import {
  useRef, useState, useEffect, useCallback,
} from 'react';

type Props = {
  audioId?: string;
  videoId?: string;
  onError?: () => void;
};

const useMediaRecord = ({
  audioId = '',
  videoId = '',
  onError = () => {},
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordStatus, setRecordStatus] = useState<
    'pending' | 'record' | 'pause'
  >('pending');
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  /** 사용자 디바이스 정보를 조회. */
  const getDevices = useCallback(async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioDevices = devices.filter(
      (device) => device.kind === 'audioinput',
    );
    const videoDevices = devices.filter(
      (device) => device.kind === 'videoinput',
    );
    return { audioDevices, videoDevices };
  }, []);

  /** 유저에게 권한을 요청함(캠여부) */
  const getUserAccess = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoId ? { deviceId: { exact: videoId } } : true,
        audio: audioId ? { deviceId: { exact: audioId } } : true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      // 상태로 관리할 경우 렌더링
      return stream;
    } catch (error) {
      onError();
      return undefined;
    }
  }, [audioId, videoId, onError]);

  /** 녹화 데이터를 기록 */
  const handleDataAvailable = useCallback((e: BlobEvent) => {
    if (e.data.size > 0) {
      setRecordedChunks((prev) => [...prev, e.data]);
    }
  }, []);

  /** 녹화촬영을 시작한다. */
  const handleRecord = useCallback(async () => {
    try {
      const stream = (await getUserAccess()) as MediaStream;
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
      setRecordStatus('record');
    } catch (error) {
      onError();
      handleRecordRemove();
    }
  }, [getUserAccess, handleDataAvailable, onError]);

  /** 녹화 장비를 제거한다. */
  const stopMediaTracks = useCallback((stream: MediaStream) => {
    if (!stream) return;
    stream.getAudioTracks().forEach((track) => track.stop());
    stream.getVideoTracks().forEach((track) => track.stop());
  }, []);

  /** 녹화를 완료. */
  const handleRecordRemove = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      stopMediaTracks(mediaRecorderRef.current.stream);
      setRecordStatus('pending');
      mediaRecorderRef.current = null;
    }
  }, [stopMediaTracks]);

  /** 녹화를 일시정지한다. */
  const handlePauseRecord = useCallback(() => {
    mediaRecorderRef.current?.pause();
    setRecordStatus('pause');
  }, []);

  /** 녹화를 재개한다. */
  const handleResumeRecord = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.resume();
      setRecordStatus('record');
    }
  }, []);

  /** 렌더링이 종료되면 모든녹화를 정리한다. */
  useEffect(
    () => () => {
      const mediaRecorder = mediaRecorderRef.current;
      if (mediaRecorder) {
        mediaRecorder.stop();
        stopMediaTracks(mediaRecorder.stream);
      }
    },
    [stopMediaTracks],
  );

  return {
    videoRef,
    handleRecord,
    handlePauseRecord,
    handleResumeRecord,
    handleRecordRemove,
    getDevices,
    recordStatus,
    recordedChunks,
  };
};

export default useMediaRecord;
