import styled from 'styled-components';
import { ColBox, ScrollBar } from '@/styles/GlobalStyle';

import useCoverLetterStore from '@/store/coverLetter/useCoverLetterStore';
import keys from '@/util/keys';
import { V } from '@/src/shared/styles';
import CoverLetterPreViewItem from './preview/CoverLetterPreViewItem';

function CoverLetterPreView() {
  const { selectedCoverLetter } = useCoverLetterStore();

  return (
    <CoverLetterPreViewContainer>
      {selectedCoverLetter.questions.map((question, idx) => (
        <CoverLetterPreViewItem key={keys(question, idx)} question={question} idx={idx} />
      ))}
    </CoverLetterPreViewContainer>
  );
}

export default CoverLetterPreView;

const CoverLetterPreViewContainer = styled.div`
  ${ColBox}
  ${ScrollBar}
  width: 100%;
  height: 200px;
  border-radius: 5px;
  padding: 15px 25px;
  margin: 15px auto;
  background-color: #1d1b1b;
  overflow-x: hidden;
  box-shadow: ${V.boxShadow2};
`;
