import { memo, useEffect, useMemo } from 'react';

import dynamic from 'next/dynamic';

import styled from 'styled-components';

import {
  InterviewLobby,
  ExpectedQuestionLayout,
} from '@/src/widgets/interview';

import {
  useDeviceStore,
  useIntvPlaylistStore,
} from '@/src/entities/interview_question';

import { Container, RunningLoader, StepProgressBar } from '@/src/shared/ui';
import { V, styleMixin } from '@/src/shared/styles';
import { useCounter } from '@/src/shared/hooks';

import InterviewSliderButtons from './InterviewSliderButtons';

const InterViewRandomSetting = dynamic(
  () =>
    import(
      '@/src/features/interview/random-quetsion/ui/InterViewRandomSetting'
    ),
  {
    ssr: false,
  },
);

const InterViewRecordSetting = dynamic(
  () => import('@/src/features/interview/setting/ui/InterviewRecordSetting'),
  {
    ssr: false,
  },
);

const InterviewFlow = dynamic(
  () => import('@/src/widgets/interview/ui/interview-flow/InterviewFlow'),
  {
    ssr: false,
    loading: () => (
      <>
        <RunningLoader />
        <p>환경 설정을 적용 중 입니다.</p>
      </>
    ),
  },
);

const MemoizedExpectedQuestionLayout = memo(ExpectedQuestionLayout);

type IntvSteps = {
  render: React.ReactNode,
  subTitle: string,
  title: string,
  rule: boolean | null,
  id: string,
}

function Interview() {
  const userPlayList = useIntvPlaylistStore((state) => state.userPlayList);
  const initUserPlayList = useIntvPlaylistStore((state) => state.initUserPlayList);

  const videoDevice = useDeviceStore((state) => state.videoDevice);
  const audioDevice = useDeviceStore((state) => state.audioDevice);
  const resetDevices = useDeviceStore((state) => state.resetDevices);

  const {
    handleDecrease: moveToPrevPage,
    handleIncrease: moveToNextPage,
    counter: currentStep,
  } = useCounter({ minCounter: 0, maxCounter: 5 });

  const interviewSteps:IntvSteps[] = useMemo(() => [
    {
      render: <InterviewLobby />,
      subTitle: 'NextStage => (면접 설정)',
      title: '면접 대기',
      rule: null,
      id: 'Step_01',
    },
    {
      render: <MemoizedExpectedQuestionLayout />,
      subTitle: 'Next Step...',
      title: '면접 질문 선택',
      rule: null,
      id: 'Step_02',
    },
    {
      render: <InterViewRandomSetting />,
      subTitle: userPlayList.length ? 'Next Step...' : '질문 설정은 필수...',
      title: '랜덤 질문 선택',
      rule: !!userPlayList.length,
      id: 'Step_03',
    },
    {
      render: <InterViewRecordSetting />,
      subTitle: 'Next Step ...',
      title: '녹화 환경 설정',
      rule: !!videoDevice && !!audioDevice,
      id: 'Step_04',
    },
    {
      render: <InterviewFlow />,
      subTitle: '면접 준비 완료',
      title: '영상 촬영',
      rule: currentStep === 5,
      id: 'Step_05',
    },
  ], [userPlayList.length, videoDevice, audioDevice, currentStep]);

  useEffect(
    () => () => {
      initUserPlayList();
      resetDevices();
    },
    [],
  );

  const currentStepData = interviewSteps[currentStep];
  return (
    <InterViewStyle>
      <StepProgressBar
        stepList={interviewSteps}
        currentStep={currentStep}
        itemToText={(value) => value.title}
        itemToid={(value) => value.id}
      />
      <RenderStep>{currentStepData.render}</RenderStep>
      <InterviewSliderButtons
        moveToNextPage={moveToNextPage}
        moveToPrevPage={moveToPrevPage}
        curPageLabel={currentStepData.subTitle}
        rule={currentStepData.rule ?? true}
        currentStep={currentStep}
      />
    </InterViewStyle>
  );
}

export default Interview;

const InterViewStyle = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
`;

const RenderStep = styled(Container.ItemBase)`
  ${styleMixin.Column('flex-start')}
  width: 100%;
  font-family: ${V.malgunGothic};
  margin-top: 5rem;
`;

// useWhyDidYouRender(
//   'InterviewStepsComponent',
//   {
//     userPlayList,
//     videoDevice,
//     audioDevice,
//     currentStep,
//     interviewSteps,
//     currentStepData,
//   },
//   {
//     initUserPlayList,
//     resetDevices,
//     moveToPrevPage,
//     moveToNextPage,
//   },
// );
