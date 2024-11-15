import styled from 'styled-components';

import { ExplanationContent } from '@/src/shared/ui';
import { styleMixin, V } from '@/src/shared/styles';

import {
  ExpectedQuestionSelector,
  UserQuestionPlayList,
} from '@/src/features/interview/';

const explanationList: string[] = [
  '면접 질문 셋팅 가이드',
  '(선택사항)샘플 질문을 선택하여 추가',
  '(선택사항)커스텀 질문을 작성하여 추가',
  '실제 면접 처럼 랜덤 질문을 원하시면 넘어가셔도 됩니다.',
  '플레이리스트와 랜덤셋팅을 조합할 수 도 있습니다.',
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
