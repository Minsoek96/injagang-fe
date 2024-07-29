import { useState } from 'react';

import styled from 'styled-components';

import { BiArrowBack } from 'react-icons/bi';

import Image from 'next/image';
import roomout from '@/public/assets/roomout.svg';

import InterViewListView from '@/components/InterViewQuestion/ExpectedQuestionLayout';

import { BaseButton } from '@/src/shared/components/button';
import dynamic from 'next/dynamic';
import { V, styleMixin } from '@/src/shared/styles';
import ArrowAnimation from '@/src/features/interview-record/InterViewMenual';

const InterViewRandomSetting = dynamic(
  () => import('@/src/features/interview-record/InterViewRandomSetting'),
  {
    ssr: false,
  },
);

const InterviewRecord = dynamic(
  () => import('@/src/features/interview-record/interviewRecord'),
  {
    ssr: false,
  },
);

const renderComponent = [
  { render: null, title: '면접영상촬영시작' },
  { render: <InterViewListView />, title: '나만의 질문 리스트 셋팅' },
  { render: <InterViewRandomSetting />, title: '랜덤 배치 리스트 셋팅' },
  { render: <InterviewRecord />, title: '면접 준비 완료' },
];

const START_SCREEN = 0;
const END_SCREEN = 3;
const SECOND_SCREEN = 1;

function Interview() {
  const [curIndex, setCurIndex] = useState<number>(START_SCREEN);

  const moveToNextPage = () => {
    setCurIndex((prevIndex) =>
      (prevIndex >= END_SCREEN ? SECOND_SCREEN : prevIndex + 1));
  };

  const moveToPrevPage = () => {
    setCurIndex((prevIndex) =>
      (prevIndex <= START_SCREEN ? START_SCREEN : prevIndex - 1));
  };

  return (
    <InterViewStyle>
      <ControlBtn>
        {curIndex > SECOND_SCREEN && (
          <BaseButton
            onClick={moveToPrevPage}
            $Size={{ width: '50px', font: '22px' }}
          >
            <BiArrowBack />
          </BaseButton>
        )}
        <BaseButton
          className="Arrow_btn"
          onClick={moveToNextPage}
          $Size={{ width: '90%', font: '20px' }}
        >
          {renderComponent[curIndex].title}
        </BaseButton>
      </ControlBtn>
      {curIndex === START_SCREEN && (
        <Menual>
          <ArrowAnimation targetId="Arrow_btn" />
          <div className="interViewImg_box">
            <Image src={roomout} alt="roomout" />
          </div>
        </Menual>
      )}
      <RecordComponent>{renderComponent[curIndex].render}</RecordComponent>
    </InterViewStyle>
  );
}

export default Interview;

const InterViewStyle = styled.div`
  ${styleMixin.Column()}
  height: 100vh;
  width: 80vw;
`;

const Menual = styled.div`
  ${styleMixin.Column()}
  margin:50px;
  width: 100%;
  height: 100%;
  .interViewImg_box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 60%;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background-color: #fff;
  }
  @media screen and (max-width: 800px) {
    .interViewImg_box {
      width: 85%;
      height: 100%;
    }
  }
`;

const ControlBtn = styled.div`
  ${styleMixin.Flex()}
  width: ${V.lgItemWidth};
  gap: 8px;
  @media screen and (max-width: 800px) {
    width: ${V.smItemWidth};
  }
`;

const RecordComponent = styled.div`
  ${styleMixin.Column()}
  width: 100%;
  height: 80%;
`;
