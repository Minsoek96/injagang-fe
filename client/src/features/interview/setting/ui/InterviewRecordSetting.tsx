import { useState } from 'react';
import { CheckBox, ExplanationContent } from '@/src/shared/ui';

import styled from 'styled-components';
import { styleMixin } from '@/src/shared/styles';
import useRecordSettings from '../model/useRecordSettings';
import { VoiceTranscriptionToggle } from './voice-transcription';
import { VideoPlayer } from './player';
import { DevicesSelector } from './device-selector';

export default function InterViewRecordSetting() {
  const [isTermsAccepted, setIsTermAccepted] = useState<boolean>(false);
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
    <Container>
      {!isTermsAccepted ? (
        <TermsWrapper>
          <ExplanationContent
            explanationList={[
              '안내사항',
              '1. 녹화하신 데이터는 외부로 전송되지 않으니 안심하세요.',
              '2. 원활한 면접을 위해 카메라와 마이크 권한이 꼭 필요해요.',
              '3. 권한을 허용하지 않으시면 면접을 진행하기 어려워요.',
              '4. 조용한 곳에서 면접을 보시는 것을 추천드려요.',
              '5. 약관 동의 후 디바이스 접근 안내가 진행됩니다.',
            ]}
          />
          <CheckBox label="확인" onChange={() => setIsTermAccepted(true)} />
        </TermsWrapper>
      ) : (
        <DevicesSettingWrapper>
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
        </DevicesSettingWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const TermsWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  border-radius: 8px;
  padding: 2rem 4rem;
  font-size: 1.6rem;
`;

const DevicesSettingWrapper = styled.div`
  ${styleMixin.Column()};
`;
