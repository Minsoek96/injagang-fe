import styled from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';

import { useCoverLetterStore } from '@/src/entities/coverLetter';
import { keys } from '@/src/shared/utils';
import CoverLetterPreViewItem from './CoverLetterPreViewItem';

function CoverLetterPreView() {
  const { selectedCoverLetter } = useCoverLetterStore();

  if (!selectedCoverLetter.questions.length) {
    return (
      <CoverLetterPreViewContainer>
        <p>선택된 리스트가 없습니다.</p>
        <p>리스트를 선택해주세요.</p>
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
  ${styleMixin.Column('center', 'flex-start')}
  ${styleMixin.ScrollBar}
  font-size: 1.8rem;
  width: 100%;
  height: 25rem;
  border-radius: 5px;
  padding: ${V.lgPadding};
  margin: 1.5rem auto;
  overflow-x: hidden;
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  box-shadow: ${V.boxShadow1};
  line-height: 1.4;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.6rem;
  }
`;
