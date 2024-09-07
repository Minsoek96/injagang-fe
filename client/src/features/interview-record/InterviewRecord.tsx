import { useEffect, useState } from 'react';

import styled from 'styled-components';

import {
  useQuestionStore,
  useRecordInfoStore,
} from '@/src/entities/interview_question';

import { Container } from '@/src/shared/components';
import { V } from '@/src/shared/styles';
import { useWebSpeech } from '@/src/shared/hooks';

import { InterViewResult } from './video-result';
import { VideoPlayer } from './video-record';

/** 영상 녹화 메인 컴포넌트 */
function InterviewRecord() {
  const [curIndex, setCurIndex] = useState<number>(0);

  const { interviewMode } = useRecordInfoStore();
  const { userPlayList } = useQuestionStore();
  const { readingTheScript, speechData } = useWebSpeech(userPlayList, 3000);
  const { initRecordInfoList } = useRecordInfoStore();

  useEffect(() => () => initRecordInfoList(), []);

  const renderComponent = () => {
    switch (interviewMode) {
    case 'record':
      return (
        <VideoPlayer
          currentIndex={curIndex}
          speechData={speechData}
          readingTheScript={readingTheScript}
          onChangeIndex={setCurIndex}
        />
      );
    case 'result':
      return (
        <InterViewResult question={speechData} currentIdx={curIndex - 1} />
      );
    default:
      return null;
    }
  };

  return (
    <RecordContainer
      $size={{
        height: '60vh',
        width: '100%',
        flex: 'Col',
        isMedia: true,
      }}
    >
      {renderComponent()}
    </RecordContainer>
  );
}

export default InterviewRecord;

const RecordContainer = styled(Container.ArticleCard)`
  position: relative;
  width: 100%;
  height: 70dvh;
  padding: 2em 1em;

  @media screen and (max-width: ${V.mediaMobile}) {
    padding: 1em 0.5em;
  }
`;
