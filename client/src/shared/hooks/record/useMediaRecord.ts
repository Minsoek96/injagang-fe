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
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordStatus, setRecordStatus] = useState<
    'pending' | 'record' | 'pause'
  >('pending');
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  /** 사용자 디바이스 정보를 조회. */
  const getDevices = useCallback(async () => {
    await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioDevices = devices.filter(
      (device) => device.kind === 'audioinput',
    );
    const videoDevices = devices.filter(
      (device) => device.kind === 'videoinput',
    );
    return { audioDevices, videoDevices };
  }, []);

  /** 현재 선택된 디바이스 정보를 제거 */
  const clearStreamRef = useCallback(() => {
    if (streamRef.current) {
      stopMediaTracks(streamRef.current);
      streamRef.current = null;
    }
  }, []);

  /** 유저에게 권한을 요청함(캠여부) */
  const getUserAccess = useCallback(async () => {
    if (streamRef.current) {
      clearStreamRef();
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoId ? { deviceId: { exact: videoId } } : true,
        audio: audioId ? { deviceId: { exact: audioId } } : true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // 중복실행을 방지
      streamRef.current = stream;
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

  /** 지원하는 MIME 타입을 확인하고 반환 */
  const getSupportedMimeType = (): string => {
    const types = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/webm',
      'video/mp4',
    ];

    const supportedType = types.find((type) =>
      MediaRecorder.isTypeSupported(type));

    if (!supportedType) {
      throw new Error('지원되는 미디어 타입이 없습니다.');
    }

    return supportedType;
  };
  /** 녹화촬영을 시작한다. */
  const handleRecord = useCallback(async () => {
    try {
      const stream = (await getUserAccess()) as MediaStream;
      const mimeType = getSupportedMimeType();
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
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
    stream.getTracks().forEach((track) => track.stop());
  }, []);

  /** 녹화를 완료. */
  const handleRecordRemove = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      stopMediaTracks(mediaRecorderRef.current.stream);
      setRecordStatus('pending');
      mediaRecorderRef.current = null;
      clearStreamRef();
    }
  }, [stopMediaTracks, clearStreamRef]);

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

      clearStreamRef();
    },
    [stopMediaTracks, clearStreamRef],
  );

  return {
    videoRef,
    handleRecord,
    handlePauseRecord,
    handleResumeRecord,
    handleRecordRemove,
    getDevices,
    getUserAccess,
    recordStatus,
    recordedChunks,
  };
};

export default useMediaRecord;
