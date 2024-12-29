import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { CoverLetterEdit } from '@/src/features/coverletter/edit';

function CoverLetterEditorPage() {
  return (
    <CoverLetterStyle>
      <CoverLetterEdit />
    </CoverLetterStyle>
  );
}

export default CoverLetterEditorPage;

const CoverLetterStyle = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
`;
