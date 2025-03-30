import { ExplanationContent } from '@/src/shared/ui';

import useRecordSettings from '../model/useRecordSettings';
import { VoiceTranscriptionToggle } from './voice-transcription';
import { VideoPlayer } from './player';
import { DevicesSelector } from './device-selector';

export default function InterViewRecordSetting() {
  const {
    videoRef,
    audioDevice,
    audioLabels,
    setAudioDevice,
    videoDevice,
    videoLabels,
    setVideoDevice,
  } = useRecordSettings();

  return (
    <>
      <ExplanationContent
        explanationList={[
          '환경설정',
          '1. 면접을 원활하게 진행하기 위해 카메라와 마이크가 필수입니다.',
          '2. 설정이 이루어지지 못하면 면접을 진행할 수 없습니다.',
          '3. 조용하고 방해받지 않는 환경에서 면접을 추천드립니다.',
        ]}
      />
      <VideoPlayer videoRef={videoRef} />
      <DevicesSelector
        selectedAudio={audioDevice}
        selectedVideo={videoDevice}
        setAudioDevice={setAudioDevice}
        setVideoDevice={setVideoDevice}
        audioLabels={audioLabels}
        videoLabels={videoLabels}
      />
      <VoiceTranscriptionToggle />
    </>
  );
}
