import useRecordSettings from '../model/useRecordSettings';

import { DevicesSelector } from './device-selector';
import { VideoPlayer } from './player';
import { VoiceTranscriptionToggle } from './voice-transcription';

export default function DeviceSettings() {
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
