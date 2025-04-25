import { useEffect } from 'react';

import styled from 'styled-components';

import { CoverLetter } from '@/src/features/coverletter/preview';

import { useCoverLetterStore } from '@/src/entities/coverLetter';
import { useAuthStore } from '@/src/entities/auth';

function CoverLetterPage() {
  const initCoverLetter = useCoverLetterStore((state) => state.initCoverLetter);
  const role = useAuthStore((state) => state.role);

  useEffect(
    () => () => {
      initCoverLetter();
    },
    [],
  );

  return (
    <CoverLetterStyle>
      {role && <CoverLetter />}
    </CoverLetterStyle>
  );
}

export default CoverLetterPage;

const CoverLetterStyle = styled.div`
  width: 100%;
`;
