import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { CoverLetterEdit } from '@/src/features/coverletter/edit';
import { Suspense } from 'react';
import { ErrorBoundary, ErrorFallback, Spinner } from '@/src/shared/ui';

function CoverLetterEditorPage() {
  return (
    <CoverLetterStyle>
      <ErrorBoundary
        renderFallback={(error, onReset) => (
          <ErrorFallback
            title="앗! 자기소개서를 불러오는데 실패했어요 😅"
            message="일시적인 오류일 수 있으니 다시 시도해 주세요."
            onReset={onReset}
          />
        )}
      >
        <Suspense fallback={<Spinner />}>
          <CoverLetterEdit />
        </Suspense>
      </ErrorBoundary>
    </CoverLetterStyle>
  );
}

export default CoverLetterEditorPage;

const CoverLetterStyle = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
`;
