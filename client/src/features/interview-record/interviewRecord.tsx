import { useEffect, useState } from "react";

import styled from "styled-components";

import Image from "next/image";

import { useInterViewStore } from "@/src/entities/interview_question";

import { MainButton } from "@/src/shared/components";
import { styleMixin, V } from "@/src/shared/styles";
import { useMediaRecord, useWebSpeech } from "@/src/shared/hooks";

import room from "@/public/assets/room.svg";
import InterViewSlider from "./InterViewSlider";
import VideoController from "./video/VideoController";
import RenderVideoInfo from "./video/RenderVideoInfo";
import { RecordMainBtn } from "./video/RecordMainButton";

/**영상 녹화 메인 컴포넌트 */
function InterviewRecord() {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isResult, setIsResult] = useState<boolean>(false);
  const [videoIndex, setVideoIndex] = useState<number>(0);

  const { confirmQuestions } = useInterViewStore();

  const { setSpeechData, readingTheScript, speechData } = useWebSpeech(
    [],
    2000
  );

  // 유저가 컨펌한 질문 리스트 셋팅
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

  /**음성 텍스트 시작 */
  const handleSpeak = async (): Promise<void> => {
    if (!isRecord) {
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
      <ResultContainer>
        {speechData.length > 0 && (
          <RenderVideoInfo
            numQuestions={speechData.length}
            curIndex={curIndex}
          />
        )}
        {recordedChunks.length > 0 && (
          <ResultController>
            <MainButton
              label="이전영상"
              onAction={() =>
                setVideoIndex((prevIndex) =>
                  prevIndex <= 1 ? 0 : videoIndex - 1
                )
              }
              sx={{ width: "100%", fontSize: "1.8rem" }}
            />
            <MainButton
              label={isResult ? '다음촬영' : '결과확인'}
              onAction={() => setIsResult(!isResult)}
              sx={{ width: "100%", fontSize: "1.8rem" }}
            />
            <MainButton
              label="다음영상"
              onAction={() =>
                setVideoIndex((prevIndex) =>
                  prevIndex >= recordedChunks.length - 1 ? 0 : videoIndex + 1
                )
              }
              sx={{ width: "100%", fontSize: "1.8rem" }}
            />
          </ResultController>
        )}
      </ResultContainer>
    </RecordStyle>
  );
}

export default InterviewRecord;
const RecordStyle = styled.div`
  ${styleMixin.Column("flex-start")}
  width: 100%;

  @media screen and (max-width: ${V.mediaMobile}) {
    max-height: 40rem;
  }
`;

const RecordContainer = styled.div<{ $isResult: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 70rem;
  border: ${(props) =>
    !props.$isResult && `2px solid ${props.theme.colors.mainLine}`};
  border-radius: 15px;
  overflow: hidden;

  .room_img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  video {
    width: 100%;
    object-fit: cover;
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

const ResultContainer = styled.div`
  ${styleMixin.Column()}
  margin-block: 1rem;
  width: 100%;
  border: 0.1em solid ${(props) => props.theme.colors.mainLine};
  border-radius: 0.8rem;
  padding: 1em;
`;

const ResultController = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
