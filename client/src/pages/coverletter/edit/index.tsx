import styled from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';
import { CoverLetterEdit } from '@/src/features/coverletter/edit';
import { Suspense } from 'react';
import {
  Container, ErrorBoundary, ErrorFallback, Spinner,
} from '@/src/shared/ui';
import { CoverLetterHeader } from '@/src/entities/coverLetter';

function CoverLetterEditorPage() {
  const title = '자소설 편집';
  return (
    <PageContainer>
      <CoverLetterEditorSection>
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
            <CoverLetterHeader title={title} />
            <CoverLetterEdit />
          </Suspense>
        </ErrorBoundary>
      </CoverLetterEditorSection>
    </PageContainer>
  );
}

export default CoverLetterEditorPage;

const PageContainer = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
`;

const CoverLetterEditorSection = styled(Container.ItemBase)`
  ${styleMixin.Column()}
  width: 100%;
  max-width: ${V.lgWidth};
`;
