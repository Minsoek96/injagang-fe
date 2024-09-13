import { styled } from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { ComboBox } from '@/src/shared/ui';

type Props = {
  selectedAudio: MediaDeviceInfo | null;
  selectedVideo: MediaDeviceInfo | null;
  setAudioDevice: (device: MediaDeviceInfo) => void;
  setVideoDevice: (device: MediaDeviceInfo) => void;
  audioLabels : MediaDeviceInfo[];
  videoLabels : MediaDeviceInfo[];
};

export default function DevicesSelector({
  selectedAudio,
  selectedVideo,
  setAudioDevice,
  setVideoDevice,
  audioLabels,
  videoLabels,
}: Props) {
  return (
    <SelectorContainer>
      <ComboBox
        label="오디오 선택"
        placeholder="오디오를 선택해주세요."
        hideLabel
        selectedItem={selectedAudio}
        items={audioLabels}
        onChange={(value) => value && setAudioDevice(value)}
        itemToId={(item) => item?.deviceId || ''}
        itemToText={(item) => item?.label || ''}
        sx={{ height: '4rem' }}
      />
      <ComboBox
        label="비디오 선택"
        placeholder="비디오를 선택해주세요."
        hideLabel
        selectedItem={selectedVideo}
        items={videoLabels}
        onChange={(value) => value && setVideoDevice(value)}
        itemToId={(item) => item?.deviceId || ''}
        itemToText={(item) => item?.label || ''}
        sx={{ height: '4rem' }}
      />
    </SelectorContainer>
  );
}

const SelectorContainer = styled.div`
  ${styleMixin.Flex()}
  gap: 1rem;
  margin: 2rem;

`;
