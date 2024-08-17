import { ComboBox } from '@/src/shared/components/';
import { useEffect, useState } from 'react';

export default function InterViewRecordSetting() {
  const [audioLabels, setAudioLabels] = useState<MediaDeviceInfo[]>([]);
  const [videoLabels, setVideoLabels] = useState<MediaDeviceInfo[]>([]);

  const [selectedAudio, setSelectedAudio] = useState<MediaDeviceInfo>();
  const [selectedVideo, setSelectedVideo] = useState<MediaDeviceInfo>();

  useEffect(() => {
    async function fetchDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = devices.filter(
        (device) => device.kind === 'audioinput',
      );
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );
      setAudioLabels(audioDevices);
      setVideoLabels(videoDevices);
    }
    fetchDevices();
  }, [selectedVideo]);

  return (
    <>
      <ComboBox
        label="오디오 선택"
        hideLabel
        selectedItem={selectedAudio}
        items={audioLabels}
        onChange={(value) => value && setSelectedAudio(value)}
        itemToId={(item) => item?.deviceId || ''}
        itemToText={(item) => item?.label || ''}
        sx={{ height: '4rem' }}
      />
      <ComboBox
        label="비디오 선택"
        hideLabel
        selectedItem={selectedVideo}
        items={videoLabels}
        onChange={(value) => value && setSelectedVideo(value)}
        itemToId={(item) => item?.deviceId || ''}
        itemToText={(item) => item?.label || ''}
        sx={{ height: '4rem' }}
      />
    </>
  );
}
