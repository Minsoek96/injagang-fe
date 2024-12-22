import styled from 'styled-components';

import { TbMoodEmpty } from "react-icons/tb";

import { styleMixin, V } from '@/src/shared/styles';

import { useCoverLetterStore } from '@/src/entities/coverLetter';
import { keys } from '@/src/shared/utils';
import CoverLetterPreViewItem from './CoverLetterPreViewItem';

/**
 * CoverLetterItems 유저가 선택한 자소서 질문 리스트 UI
 * - 유저가 선택한 자소서의 질문 리스트를 출력
 */
function CoverLetterPreView() {
  const { selectedCoverLetter } = useCoverLetterStore();

  if (!selectedCoverLetter.questions.length) {
    return (
      <CoverLetterPreViewContainer>
        <EmptyContainer>
          <TbMoodEmpty />
          <EmptyTitle>선택된 자소서가 없습니다.</EmptyTitle>
          <EmptyText>자소서를 선택해주세요.</EmptyText>
        </EmptyContainer>
      </CoverLetterPreViewContainer>
    );
  }
  return (
    <CoverLetterPreViewContainer>
      {selectedCoverLetter.questions.map((question, idx) => (
        <CoverLetterPreViewItem
          key={keys(question, idx)}
          question={question}
          idx={idx}
        />
      ))}
    </CoverLetterPreViewContainer>
  );
}

export default CoverLetterPreView;

const CoverLetterPreViewContainer = styled.ul`
  ${styleMixin.Column('flex-start', 'flex-start')}
  width: 100%;
  height: 40rem;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 1.2rem;
  box-shadow: ${V.boxShadow1};
  @media screen and (max-width: ${V.mediaMobile}) {
    height: 20rem;
  }
`;

const EmptyContainer = styled.div`
  ${styleMixin.Column('center', 'center')}
  width: 100%;
  height: 100%;
  padding: 2rem;
  text-align: center;

  svg {
    ${styleMixin.Flex()}
    font-size: 7rem;
    margin-bottom: 1.6rem;
    color: ${props => props.theme.colors.emptyGray};
  }
`;

const EmptyTitle = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const EmptyText = styled.p`
  font-size: 1.4rem;
`;
