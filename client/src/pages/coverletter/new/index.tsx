import { Suspense } from 'react';

import { styled } from 'styled-components';

import { CoverLetterCreator } from '@/src/features/coverletter/new';

import { styleMixin } from '@/src/shared/styles';
import { Spinner } from '@/src/shared/ui';
import { APIErrorBoundary } from '@/src/features/boundary';

function CoverLetterEditorPage() {
  return (
    <CoverLetterStyle>
      <APIErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <CoverLetterCreator />
        </Suspense>
      </APIErrorBoundary>
    </CoverLetterStyle>
  );
}

export default CoverLetterEditorPage;

const CoverLetterStyle = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
`;
