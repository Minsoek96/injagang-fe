import { useEffect, useState } from 'react';

import styled from 'styled-components';

import Image from 'next/image';

import { styleMixin, V } from '@/src/shared/styles';

import { BaseButton } from '@/src/shared/components/button';

import { useMediaRecord, useWebSpeech } from '@/src/shared/hooks';
import { useInterViewStore } from '@/src/entities/interview_question';
import room from '@/public/assets/room.svg';
import InterViewSlider from './InterViewSlider';
import VideoController from './video/VideoController';
import RenderVideoInfo from './video/RenderVideoInfo';

import { RecordMainBtn } from './video/RecordMainButton';

function InterviewRecord() {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [changeImg, setChangeImg] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<boolean>(false);
  const [videoIndex, setVideoIndex] = useState<number>(0);

  const { confirmQuestions } = useInterViewStore();

  const { setSpeechData, readingTheScript, speechData } = useWebSpeech(
    [],
    2000,
  );

  useEffect(() => {
    setSpeechData([...confirmQuestions]);
  }, [confirmQuestions]);

  const {
    videoRef,
    handleRecord,
    handlePauseRecord,
    handleResumeRecord,
    handleRecordRemove,
    isPaused,
    isRecord,
    recordedChunks,
  } = useMediaRecord();

  const handleSpeak = async (): Promise<void> => {
    if (!isRecord) {
      setChangeImg(!changeImg);
      if (curIndex < speechData.length) {
        await readingTheScript(curIndex);
        setCurIndex(curIndex + 1);
      } else {
        setCurIndex(0);
      }
      handleRecord();
    } else {
      handleRecordRemove();
    }
  };

  return (
    <RecordStyle>
      <RecordContainer $isResult={isResult}>
        <Image className="room_img" src={room} alt="interView" />
        <Camera>
          {!isResult ? (
            <video autoPlay muted ref={videoRef} />
          ) : (
            recordedChunks.length > 0 && (
              <InterViewSlider
                idx={videoIndex}
                video={recordedChunks}
                question={speechData}
              />
            )
          )}
          {isRecord ? (
            <VideoController
              isPaused={isPaused}
              handleResumeRecord={handleResumeRecord}
              handlePauseRecord={handlePauseRecord}
              handleSpeak={handleSpeak}
            />
          ) : (
            <RecordMainBtn handleSpeak={handleSpeak} isRecord={isRecord} />
          )}
        </Camera>
      </RecordContainer>
      <Result>
        {speechData.length > 0 && (
          <RenderVideoInfo
            numQuestions={speechData.length}
            curIndex={curIndex}
          />
        )}
        {recordedChunks.length > 0 && (
          <ResultContainer>
            <BaseButton
              onClick={() =>
                setVideoIndex((prevIndex) =>
                  (prevIndex <= 1 ? 0 : videoIndex - 1))}
              $Size={{ width: '150px', font: '15px' }}
            >
              이전영상
            </BaseButton>
            <BaseButton
              onClick={() => setIsResult(!isResult)}
              $Size={{ width: '150px', font: '15px' }}
            >
              결과확인
            </BaseButton>
            <BaseButton
              onClick={() =>
                setVideoIndex((prevIndex) =>
                  (prevIndex >= recordedChunks.length - 1 ? 0 : videoIndex + 1))}
              $Size={{ width: '150px', font: '15px' }}
            >
              다음영상
            </BaseButton>
          </ResultContainer>
        )}
      </Result>
    </RecordStyle>
  );
}

export default InterviewRecord;
const RecordStyle = styled.div`
  ${styleMixin.Flex()}
  margin: 20px;
  gap: 20px;
  width: 90%;
  height: 90%;
`;

const RecordContainer = styled.div<{ $isResult: boolean }>`
  position: relative;
  display: flex;
  flex-grow: 1;
  width: ${V.lgItemWidth};
  height: 60%;
  border: ${({ $isResult }) => !$isResult && '2px solid #e0e0e0'};
  border-radius: 15px;
  overflow: hidden;

  .interView_img {
    display: ${({ $isResult }) => ($isResult ? 'none' : 'block')};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 80%;
    object-fit: cover;
  }

  video {
    width: 100%;
    height: ${({ $isResult }) => ($isResult ? '75%' : '100%')};
    object-fit: cover;
  }

  @media screen and (max-width: 800px) {
    width: ${V.smItemWidth};
    video {
      height: ${({ $isResult }) => ($isResult ? '65%' : '100%')};
    }
  }
`;

const Camera = styled.div`
  ${styleMixin.Flex()}
  position: absolute;
  width: 100%;
  height: 100%;

  .record_btn {
    position: absolute;
    bottom: 25px;
    left: 35px;

    border: none;
    outline: none;

    padding: 10px 20px;
    background-image: linear-gradient(to right, #252427, #362f31);
    color: #fff;
    font-size: 22px;
    font-weight: 600;
    border-radius: 25px;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      scale: 1.05;
    }
  }
`;

const Result = styled.div`
  ${styleMixin.Column()}
  align-items: flex-start;
  gap: 15px;
  width: 100%;
  height: 20%;
  padding: 10px 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  gap: 10px;
`;
