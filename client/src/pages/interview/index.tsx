import dynamic from 'next/dynamic';

import { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import { ExpectedQuestionLayout } from '@/src/features/interview-question';

import {
  useInterViewStore,
  useRecordInfoStore,
} from '@/src/entities/interview_question';

import { Container, StepProgressBar } from '@/src/shared/components';
import { V, styleMixin } from '@/src/shared/styles';

import InterviewSliderButtons from './InterviewSliderButtons';
import InterviewMenual from './InterviewMenual';

const InterViewRandomSetting = dynamic(
  () => import('@/src/features/random-quetsion/InterViewRandomSetting'),
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
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { initConfirmQuestions } = useInterViewStore();
  const { videoDevice, audioDevice } = useRecordInfoStore();

  const renderComponent = [
    {
      render: <InterviewMenual />,
      subTitle: '면접영상촬영시작',
      title: '약관동의',
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
      subTitle: 'Next Step...',
      title: '랜덤 질문 선택',
      rule: null,
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

  const START_SCREEN = 0;
  const END_SCREEN = renderComponent.length - 1;
  const SECOND_SCREEN = 1;

  const moveToNextPage = useCallback(() => {
    setCurrentStep((prevStep) =>
      (prevStep >= END_SCREEN ? SECOND_SCREEN : prevStep + 1));
  }, [currentStep]);

  const moveToPrevPage = useCallback(() => {
    setCurrentStep((prevStep) =>
      (prevStep <= START_SCREEN ? START_SCREEN : prevStep - 1));
  }, [currentStep]);

  useEffect(
    () => () => {
      initConfirmQuestions();
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
      <RecordComponent>{renderComponent[currentStep].render}</RecordComponent>
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

const RecordComponent = styled(Container.ItemBase)`
  ${styleMixin.Column('flex-start')}
  width: 100%;
  font-family: ${V.malgunGothic};
  margin-top: 5rem;
`;
