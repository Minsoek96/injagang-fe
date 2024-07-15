import styled from 'styled-components';

import CoverLetterEdit from '@/components/CoverLetter/edit/CoverLetterEdit';

import { styleMixin } from '@/src/shared/styles';

function CoverLetterEditorPage() {
  return (
    <CoverLetterStyle>
      <CoverLetterEdit />
    </CoverLetterStyle>
  );
}

export default CoverLetterEditorPage;

const CoverLetterStyle = styled.div`
  ${styleMixin.Column()}
`;
