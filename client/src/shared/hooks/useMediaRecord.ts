import {
  useRef, useState, useEffect, useCallback,
} from 'react';

type Props = {
  audioId? : string;
  videoId? : string;
};

const useMediaRecord = ({ audioId = '', videoId = '' }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordStatus, setRecordStatus] = useState<
    'pending' | 'record' | 'pause'
  >('pending');
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  /** 유저에게 권한을 요청함(캠여부) */
  const getUserAccess = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: audioId,
        },
        video: {
          deviceId: videoId,
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      return undefined;
    }
  }, []);

  const handleDataAvailable = useCallback((e: BlobEvent) => {
    if (e.data.size > 0) {
      setRecordedChunks((prev) => [...prev, e.data]);
    }
  }, []);

  /** 녹화촬영을 시작한다. */
  const handleRecord = useCallback(async () => {
    const stream = (await getUserAccess()) as MediaStream;

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    setRecordStatus('record');
  }, [getUserAccess, handleDataAvailable]);

  const stopMediaTracks = useCallback((stream: MediaStream) => {
    stream.getAudioTracks().forEach((track) => track.stop());
    stream.getVideoTracks().forEach((track) => track.stop());
  }, []);

  /** 녹화를 완료. */
  const handleRecordRemove = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      const stream = videoRef.current?.srcObject as MediaStream;
      stopMediaTracks(stream);
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
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        const stream = videoRef.current?.srcObject as MediaStream;
        stopMediaTracks(stream);
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
    recordStatus,
    recordedChunks,
  };
};

export default useMediaRecord;
