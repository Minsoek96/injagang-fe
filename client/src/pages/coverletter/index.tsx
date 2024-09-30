import { useEffect } from 'react';

import styled from 'styled-components';
import { styleMixin } from '@/src/shared/styles';

import { CoverLetter } from '@/src/features/coverletter/preview';

import { useCoverLetterStore } from '@/src/entities/coverLetter';
import { useAuthStore } from '@/src/entities/auth';

function CoverLetterPage() {
  const { initCoverLetter } = useCoverLetterStore();
  const { role } = useAuthStore();

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
  ${styleMixin.Column('flex-start')}
  width: 100%;
`;
