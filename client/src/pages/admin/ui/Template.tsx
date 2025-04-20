import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { Spinner } from '@/src/shared/ui/spinner';
import { Container } from '@/src/shared/ui';

import TemplateViewSwitcher from './TemplateViewSwitcher';

const TemplateTitleList = dynamic(
  () => import('@/src/features/template/preview/TemplateTitleList'),
  {
    suspense: true,
  },
);

function Template() {
  return (
    <TemplateContainer>
      <MainTitle>템플릿 만들기</MainTitle>
      <TemplateCard $size={{ width: '100%', height: '35rem' }}>
        <Suspense fallback={<Spinner />}>
          <TemplateTitleList />
        </Suspense>
      </TemplateCard>
      <TemplateCard $size={{ width: '100%', height: '35rem' }}>
        <TemplateViewSwitcher />
      </TemplateCard>
    </TemplateContainer>
  );
}

export default Template;

const TemplateContainer = styled(Container.ItemBase)`
  ${styleMixin.Column()};
  width: 100%;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const TemplateCard = styled(Container.ArticleCard)``;

const MainTitle = styled.h1`
  font-size: 2rem;
  padding: 1em 2em;
  border: 0.1em solid ${(props) => props.theme.colors.mainLine};
  width: 100%;
  border-radius: 8px;
`;
