import dynamic from 'next/dynamic';

import styled from 'styled-components';
import { ColBox, StyleCard, MainTitleContainer } from '@/styles/GlobalStyle';
import { V } from '@/src/shared/styles';

import Spinner from '@/components/Spinner';

import APIErrorBoundary from '@/components/APIErrorBoundary';
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
        <Card $size={{ width: `${V.xlItemWidth}`, height: '350px' }}>
          <APIErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <TemplateTitleList />
            </Suspense>
          </APIErrorBoundary>
        </Card>
        <Card $size={{ width: `${V.xlItemWidth}`, height: '350px' }}>
          <TemplateViewController />
        </Card>
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
  @media screen and (max-width: 1200px) {
    ${ColBox}
  }
`;

const Card = styled(StyleCard)`
  margin-bottom: 8px;
  @media screen and (max-width: 800px) {
    ${ColBox}
    flex-direction: column-reverse;
    width: ${V.smItemWidth};
  }
`;
