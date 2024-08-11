import styled from 'styled-components';

import { ExplanationContent } from '@/src/shared/components';
import { styleMixin, V } from '@/src/shared/styles';

import { UserQuestionPlayList } from './playlist';
import { ExpectedQuestionSelector } from './expected-question';

const explanationList = [
  '면접 질문 셋팅 가이드',
  '(선택사항)샘플 질문을 선택하여 추가',
  '(선택사항)커스텀 질문을 작성하여 추가',
  '실제 면접 처럼 랜덤 질문을 원하시면 넘어가셔도 됩니다.',
  '플레이리스트와 랜덤셋팅을 조합할 수 도 있습니다.',
  '모든 설정이 끝난후 확정 버튼을 꼭 눌러주세요...',
];

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
