import styled from 'styled-components';

import { ExplanationContent } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

import {
  ExpectedQuestionSelector,
  UserQuestionPlayList,
} from '@/src/features/interview/';

const explanationList: string[] = [
  '면접 질문 설정',
  '- 플레이리스트에 등록된 질문들만 순서대로 재생됩니다',
  '- 유형별 질문을 선택하거나 직접 질문을 작성하실 수 있어요',
  '- 실전처럼 예측할 수 없는 질문을 원하시면 랜덤 모드를 이용해보세요',
  '- 플레이리스트와 랜덤 모드는 함께 사용하실 수도 있습니다',
  '- 랜덤 질문만 원하시면 이 단계를 건너뛰셔도 됩니다',
];

/** 인터뷰 질문 설정 레이아웃
 * - ExplanationContent : 사용자 가이드를 표시합니다.
 * - ExpectedQuestionSelecotr : 관리자가 제공하는 질문을 선택
 * - UserQuestionPlayList : 유저가 선택한 질문 + 커스텀 질문
 */
function ExpectedQuestionLayout() {
  return (
    <InterViewListViewStyle>
      <ExplanationContent explanationList={explanationList} />
      <SwitchContainer>
        <ExpectedQuestionSelector />
        <UserQuestionPlayList />
      </SwitchContainer>
    </InterViewListViewStyle>
  );
}

export default ExpectedQuestionLayout;

const InterViewListViewStyle = styled.div`
  width: 100%;
`;

const SwitchContainer = styled.div`
  ${styleMixin.Flex()}
  max-width: 100%;
  gap: 25px;
  @media screen and (max-width: ${V.mediaTablet}) {
    ${styleMixin.Column()}
  }
`;
