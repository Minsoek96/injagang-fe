import { useCallback, useEffect, useState } from 'react';

import { useRecordInfoStore } from '@/src/entities/interview_question';

import { useMediaRecord, useModal } from '@/src/shared/hooks';

export default function useRecordSettings() {
  const [audioLabels, setAudioLabels] = useState<MediaDeviceInfo[]>([]);
  const [videoLabels, setVideoLabels] = useState<MediaDeviceInfo[]>([]);

  const { setModal } = useModal();

  const {
    setAudioDevice,
    setVideoDevice,
    audioDevice,
    videoDevice,
    initDevices,
  } = useRecordInfoStore();

  const showErrorModal = useCallback(() => {
    setModal({
      title: 'Warring',
      message: '디바이스 연결에 실패했습니다 ㅜㅜ',
    });
    initDevices();
  }, []);

  const { videoRef, handleRecord, getDevices } = useMediaRecord({
    onError: () => showErrorModal(),
    audioId: audioDevice?.deviceId,
    videoId: videoDevice?.deviceId,
  });

  const FetchSettingDevices = useCallback(async () => {
    try {
      const { audioDevices, videoDevices } = await getDevices();
      setAudioLabels(audioDevices);
      setVideoLabels(videoDevices);
    } catch (error) {
      initDevices();
    }
  }, []);

  useEffect(() => {
    FetchSettingDevices();
    const handleFetchDevices = () => {
      FetchSettingDevices();
    };
    navigator.mediaDevices.addEventListener('devicechange', handleFetchDevices);
    return () =>
      navigator.mediaDevices.removeEventListener(
        'devicechange',
        handleFetchDevices,
      );
  }, []);

  useEffect(() => {
    if (!!audioDevice && !!videoDevice) {
      handleRecord();
    }
  }, [audioDevice, videoDevice]);

  return {
    videoRef,
    audioDevice,
    audioLabels,
    setAudioDevice,
    videoDevice,
    videoLabels,
    setVideoDevice,
  };
}
