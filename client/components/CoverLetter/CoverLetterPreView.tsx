import styled from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';

import { useCoverLetterStore } from '@/src/entities/coverLetter';
import { keys } from '@/src/shared/utils';
import CoverLetterPreViewItem from './preview/CoverLetterPreViewItem';

function CoverLetterPreView() {
  const { selectedCoverLetter } = useCoverLetterStore();

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

const CoverLetterPreViewContainer = styled.div`
  ${styleMixin.Column()}
  ${styleMixin.ScrollBar}
  width: 100%;
  height: 200px;
  border-radius: 5px;
  padding: 15px 25px;
  margin: 15px auto;
  background-color: #1d1b1b;
  overflow-x: hidden;
  box-shadow: ${V.boxShadow2};
`;
