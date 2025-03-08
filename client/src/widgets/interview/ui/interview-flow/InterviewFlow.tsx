import { useEffect, useState } from 'react';

import styled from 'styled-components';

import {
  useIntvContentStore,
  useIntvPlaylistStore,
  useIntvRecordStore,
} from '@/src/entities/interview_question';

import { Container } from '@/src/shared/ui';
import { useWebSpeech } from '@/src/shared/hooks';

import { InterviewResultViewer, InterviewRecordingQueue } from '@/src/features/interview';

/** 영상 녹화 메인 컴포넌트 */
export default function InterviewFlow() {
  const [curIndex, setCurIndex] = useState<number>(0);

  const { interviewMode } = useIntvRecordStore();
  const { clearRecordContents } = useIntvContentStore();

  const { userPlayList } = useIntvPlaylistStore();
  const { readingTheScript, speechData } = useWebSpeech(userPlayList, 3000);

  useEffect(() => () => clearRecordContents(), []);

  const renderComponent = () => {
    switch (interviewMode) {
    case 'record':
      return (
        <InterviewRecordingQueue
          currentIndex={curIndex}
          speechData={speechData}
          readingTheScript={readingTheScript}
          onChangeIndex={setCurIndex}
        />
      );
    case 'result':
      return (
        <InterviewResultViewer question={speechData} currentIdx={curIndex - 1} />
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

const RecordContainer = styled(Container.ArticleCard)`
  position: relative;
  width: 100%;
  height: 70dvh;
  border: none;
  padding: 0;
`;
