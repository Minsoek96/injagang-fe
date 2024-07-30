import { useEffect } from 'react';

import styled from 'styled-components';
import { styleMixin } from '@/src/shared/styles';

import CoverLetter from '@/src/features/coverletter/CoverLetter';
import { useCoverLetterStore } from '@/src/entities/coverLetter';

function CoverLetterPage() {
  const { initCoverLetter } = useCoverLetterStore();

  useEffect(
    () => () => {
      initCoverLetter();
    },
    [],
  );

  return (
    <CoverLetterStyle>
      <CoverLetter />
    </CoverLetterStyle>
  );
}

export default CoverLetterPage;

const CoverLetterStyle = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
`;
