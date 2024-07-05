import { useEffect } from 'react';

import styled from 'styled-components';
import { ColBox } from '@/styles/GlobalStyle';

import CoverLetter from '@/components/CoverLetter/CoverLetter';

import useCoverLetterStore from '@/store/coverLetter/useCoverLetterStore';

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
  ${ColBox}
`;
