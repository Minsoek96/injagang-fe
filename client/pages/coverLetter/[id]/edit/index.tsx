import styled from 'styled-components';

import CoverLetterEdit from '@/components/CoverLetter/edit/CoverLetterEdit';

import { ColBox } from '@/styles/GlobalStyle';

function CoverLetterEditorPage() {
  return (
    <CoverLetterStyle>
      <CoverLetterEdit />
    </CoverLetterStyle>
  );
}

export default CoverLetterEditorPage;

const CoverLetterStyle = styled.div`
  ${ColBox}
`;
