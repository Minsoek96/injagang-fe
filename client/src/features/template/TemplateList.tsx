import dynamic from 'next/dynamic';

import styled from 'styled-components';
import { BaseTitle as MainTitleContainer } from '@/src/shared/components/title';
import { V, styleMixin } from '@/src/shared/styles';
import { BaseCard } from '@/src/shared/components/card';

import { Spinner } from '@/src/shared/components/spinner';

import { APIErrorBoundary } from '@/src/features/boundary';
import { Suspense } from 'react';
import TemplateViewController from './TemplateDetail/TemplateViewController';

const TemplateTitleList = dynamic(
  () => import('./TemplateTitle/TemplateTitleList'),
  {
    suspense: true,
  },
);

function TemplateList() {
  return (
    <TemplateStlyed>
      <MainTitleContainer>템플릿 만들기</MainTitleContainer>
      <TemplateContainer>
        <TemplateCard $size={{ width: `${V.xlItemWidth}`, height: '350px' }}>
          <APIErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <TemplateTitleList />
            </Suspense>
          </APIErrorBoundary>
        </TemplateCard>
        <TemplateCard $size={{ width: `${V.xlItemWidth}`, height: '350px' }}>
          <TemplateViewController />
        </TemplateCard>
      </TemplateContainer>
    </TemplateStlyed>
  );
}

export default TemplateList;
const TemplateStlyed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 50px 0;
`;

const TemplateContainer = styled.div`
  display: flex;
  gap: 2rem;
  @media screen and (max-width: 1200px) {
    ${styleMixin.Column()}
  }
`;

const TemplateCard = styled(BaseCard)`
  margin-bottom: 8px;
  @media screen and (max-width: 800px) {
    ${styleMixin.Column()}
    flex-direction: column-reverse;
    width: ${V.smItemWidth};
  }
`;
