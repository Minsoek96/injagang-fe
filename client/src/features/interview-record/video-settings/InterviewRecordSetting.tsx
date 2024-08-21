import { useCallback, useEffect, useState } from 'react';

import { useRecordInfoStore } from '@/src/entities/interview_question';

import { ComboBox, ExplanationContent } from '@/src/shared/components/';
import { useMediaRecord, useModal } from '@/src/shared/hooks';
import styled from 'styled-components';
import { styleMixin } from '@/src/shared/styles';

export default function InterViewRecordSetting() {
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

  // TODO: 좀 더 유연한 에러처리 방식 생각해보기
  const showErrorModal = useCallback(() => {
    setModal({
      contents: {
        title: 'Warring',
        message: '디바이스 연결에 실패했습니다 ㅜㅜ',
      },
    });
    initDevices();
  }, []);

  const { videoRef, handleRecord, getDevices } = useMediaRecord({
    onError: () => showErrorModal(),
    audioId: audioDevice?.deviceId,
    videoId: videoDevice?.deviceId,
  });

  const FetchSettingDevices = async () => {
    try {
      const { audioDevices, videoDevices } = await getDevices();
      setAudioLabels(audioDevices);
      setVideoLabels(videoDevices);
    } catch (error) {
      initDevices();
    }
  };

  useEffect(() => {
    FetchSettingDevices();
  }, []);

  useEffect(() => {
    handleRecord();
  }, [audioDevice, videoDevice]);

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
      <video autoPlay muted ref={videoRef} />
      <SelectorContainer>
        <ComboBox
          label="오디오 선택"
          placeholder="오디오를 선택해주세요."
          hideLabel
          selectedItem={audioDevice}
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
          selectedItem={videoDevice}
          items={videoLabels}
          onChange={(value) => value && setVideoDevice(value)}
          itemToId={(item) => item?.deviceId || ''}
          itemToText={(item) => item?.label || ''}
          sx={{ height: '4rem' }}
        />
      </SelectorContainer>
    </>
  );
}

const SelectorContainer = styled.div`
  ${styleMixin.Flex()}
  gap: 1rem;
  margin: 2rem;
`;
