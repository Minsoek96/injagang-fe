import { useEffect, useState } from 'react';

import styled from 'styled-components';

import {
  useIntvContentStore,
  useIntvRecordStore,
} from '@/src/entities/interview_question';

import { Container } from '@/src/shared/ui';

import {
  InterviewResultViewer,
  InterviewRecordingQueue,
} from '@/src/features/interview';

/** 영상 녹화 메인 컴포넌트 */
export default function InterviewFlow() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const interviewMode = useIntvRecordStore((state) => state.interviewMode);

  // 촬영 정보 초기화
  const clearRecordStates = useIntvRecordStore(
    (state) => state.clearRecordStates,
  );

  // 콘텐츠 정보 초기화
  const clearRecordContents = useIntvContentStore(
    (state) => state.clearRecordContents,
  );

  useEffect(
    () => () => {
      clearRecordContents();
      clearRecordStates();
    },
    [],
  );

  const renderComponent = () => {
    switch (interviewMode) {
    case 'record':
      return (
        <InterviewRecordingQueue
          currentIndex={currentIndex}
          onChangeIndex={setCurrentIndex}
        />
      );
    case 'result':
      return <InterviewResultViewer currentIndex={currentIndex - 1} />;
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

// useWhyDidYouRender(
//   'IntvFlow',
//   { interviewMode, currentIndex },
//   { setCurrentIndex, clearRecordContents, clearRecordStates },
// );
