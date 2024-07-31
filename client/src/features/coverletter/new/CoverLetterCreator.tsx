import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { v4 as uuid4 } from 'uuid';

import {
  BtnType,
} from '@/src/shared/components';
import { CoverLetterTemplate } from '@/src/features/coverletter/common';

import { useControlTemplate, useCoverLetterCreatorLogic } from '../hooks';

const moveCoverLetterMainPage = '/coverLetter';

function CoverLetterCreator() {
  const router = useRouter();
  const {
    qnaList,
    setQnAList,
    deleteQnAList,
    changeQnAList,
    addQnAList,
    handleDispatch,
    setCoverLetterTitle,
    coverLetterTitle,
  } = useCoverLetterCreatorLogic();

  const {
    selectedTemplateTitle,
    changeSelectedTemplate,
    selectedTemplate,
    templateTitles,
  } = useControlTemplate();

  useEffect(() => {
    const resetSelectedTemplateList = selectedTemplate.questions.map((a) => ({
      qnaId: uuid4(),
      question: a,
      answer: '',
    }));
    setQnAList(resetSelectedTemplateList);
  }, [selectedTemplate]);

  const actionButtons: BtnType.BaseProps[] = [
    {
      label: '뒤로가기',
      onAction: () => router.push(moveCoverLetterMainPage),
      sx: { fontSize: '2em' },
    },
    {
      label: '작성완료',
      onAction: () => handleDispatch(),
      sx: { fontSize: '2em' },
    },
  ];

  return (
    <CoverLetterTemplate
      mainTitle="자소서 작성하기"
      coverLetterTitle={coverLetterTitle}
      setCoverLetterTitle={setCoverLetterTitle}
      qnaList={qnaList}
      deleteQnAList={deleteQnAList}
      changeQnAList={changeQnAList}
      addQnAList={addQnAList}
      actionButtons={actionButtons}
      isLoading={false}
      isTemplate
      selectedTemplateTitle={selectedTemplateTitle}
      templateTitles={templateTitles}
      changeSelectedTemplate={changeSelectedTemplate}
    />
  );
}

export default CoverLetterCreator;
