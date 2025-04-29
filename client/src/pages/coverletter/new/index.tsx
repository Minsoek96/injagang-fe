import { styled } from 'styled-components';

import { CoverLetterCreator } from '@/src/features/coverletter/new';

import { styleMixin, V } from '@/src/shared/styles';
import {
  Container,
} from '@/src/shared/ui';
import { CoverLetterHeader } from '@/src/entities/coverLetter';

function CoverLetterCreaterPage() {
  const title = '자소설 쓰기';
  return (
    <PageContainer>
      <CoverLetterCreatorSection>
        <CoverLetterHeader title={title} />
        <CoverLetterCreator />
      </CoverLetterCreatorSection>
    </PageContainer>
  );
}

export default CoverLetterCreaterPage;

const PageContainer = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
`;

const CoverLetterCreatorSection = styled(Container.ItemBase)`
  ${styleMixin.Column()};
  width: 100%;
  max-width: ${V.lgWidth};
`;
