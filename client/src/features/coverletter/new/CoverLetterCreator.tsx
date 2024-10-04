import { useState } from 'react';

import { styled } from 'styled-components';

import { SubmitHandler } from 'react-hook-form';

import {
  coverLetterMutation,
  coverLetterType,
} from '@/src/entities/coverLetter';
import { useFetchTemplate } from '@/src/entities/template/queries';

import { styleMixin, V } from '@/src/shared/styles';
import {
  Container,
} from '@/src/shared/ui';
import { usePageRouter } from '@/src/shared/hooks';

import CreateForm from './CreateForm';

export default function CoverLetterCreator() {
  const { moveCoverLetterMainPage } = usePageRouter();
  const { data: templateList = [] } = useFetchTemplate();
  const { mutate } = coverLetterMutation.useWriteCoverLetter();

  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState<string>('');

  /** field 반영 */
  const onSubmit: SubmitHandler<coverLetterType.ICoverLetter> = (data) => {
    mutate(data);
    moveCoverLetterMainPage();
  };

  return (
    <CoverLetterCreatorContainer>
      <MainTitle>자기소개서 작성</MainTitle>
      <CreateForm
        movePage={moveCoverLetterMainPage}
        onSubmit={onSubmit}
        templateList={templateList}
        selectedTemplateTitle={selectedTemplateTitle}
        setSelectedTemplateTitle={setSelectedTemplateTitle}
      />
    </CoverLetterCreatorContainer>
  );
}

const CoverLetterCreatorContainer = styled(Container.ItemBase)`
  ${styleMixin.Column()}
  width: 100%;
  max-width: ${V.lgWidth};
`;

const MainTitle = styled.h2`
  ${styleMixin.Flex('flex-start', 'flex-start')}
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
  text-decoration: underline;
  text-underline-position: under;
  text-underline-offset: 0;
`;
