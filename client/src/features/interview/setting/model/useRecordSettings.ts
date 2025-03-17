import { useCallback, useEffect, useState } from 'react';

import { useDeviceStore } from '@/src/entities/interview_question';

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
    resetDevices,
  } = useDeviceStore();

  const showErrorModal = useCallback(() => {
    setModal({
      title: 'Warning',
      message: '디바이스 연결에 실패했습니다 ㅜㅜ',
    });
    resetDevices();
  }, []);

  const {
    videoRef, handleRecord, getDevices,
  } = useMediaRecord({
    onError: () => showErrorModal(),
    audioId: audioDevice?.deviceId,
    videoId: videoDevice?.deviceId,
  });

  const fetchSettingDevices = useCallback(async () => {
    try {
      const { audioDevices, videoDevices } = await getDevices();
      setAudioLabels(audioDevices);
      setVideoLabels(videoDevices);
    } catch (error) {
      resetDevices();
    }
  }, []);

  useEffect(() => {
    fetchSettingDevices();
    const handleFetchDevices = () => {
      fetchSettingDevices();
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
