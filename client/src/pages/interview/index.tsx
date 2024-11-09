import { useEffect } from 'react';

import dynamic from 'next/dynamic';

import styled from 'styled-components';

import {
  useQuestionStore,
  useRecordInfoStore,
} from '@/src/entities/interview_question';

import { Container, StepProgressBar } from '@/src/shared/ui';
import { V, styleMixin } from '@/src/shared/styles';
import { useCounter } from '@/src/shared/hooks';
import { ExpectedQuestionLayout } from '@/src/widgets/interview';

import InterviewSliderButtons from './InterviewSliderButtons';
import InterviewMenual from './InterviewMenual';

const InterViewRandomSetting = dynamic(
  () => import('@/src/features/interview/random-quetsion/ui/InterViewRandomSetting'),
  {
    ssr: false,
  },
);

const InterViewRecordSetting = dynamic(
  () =>
    import(
      '@/src/features/interview-record/video-settings/InterviewRecordSetting'
    ),
  {
    ssr: false,
  },
);

const InterviewRecord = dynamic(
  () => import('@/src/features/interview-record/InterviewRecord'),
  {
    ssr: false,
  },
);

function Interview() {
  const { initUserPlayList, userPlayList } = useQuestionStore();
  const { videoDevice, audioDevice, initDevices } = useRecordInfoStore();
  const {
    handleDecrease: moveToPrevPage,
    handleIncrease: moveToNextPage,
    counter: currentStep,
  } = useCounter({ minCounter: 0, maxCounter: 5 });

  const renderComponent = [
    {
      render: <InterviewMenual />,
      subTitle: '면접영상촬영시작',
      title: '면접 대기',
      rule: null,
      id: 'Step_01',
    },
    {
      render: <ExpectedQuestionLayout />,
      subTitle: 'Next Step...',
      title: '면접 질문 선택',
      rule: null,
      id: 'Step_02',
    },
    {
      render: <InterViewRandomSetting />,
      subTitle: userPlayList.length
        ? 'Next Step...'
        : '질문 설정은 필수...',
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
      render: <InterviewRecord />,
      subTitle: '면접 준비 완료',
      title: '영상 촬영',
      rule: currentStep === 5,
      id: 'Step_05',
    },
  ];

  useEffect(
    () => () => {
      initUserPlayList();
      initDevices();
    },
    [],
  );

  return (
    <InterViewStyle>
      <StepProgressBar
        stepList={renderComponent}
        currentStep={currentStep}
        itemToText={(value) => value.title}
        itemToid={(value) => value.id}
      />
      <RenderComponent>{renderComponent[currentStep].render}</RenderComponent>
      <InterviewSliderButtons
        moveToNextPage={moveToNextPage}
        moveToPrevPage={moveToPrevPage}
        curPageLabel={renderComponent[currentStep].subTitle}
        rule={renderComponent[currentStep].rule ?? true}
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

const RenderComponent = styled(Container.ItemBase)`
  ${styleMixin.Column('flex-start')}
  width: 100%;
  font-family: ${V.malgunGothic};
  margin-top: 5rem;
`;
