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

  const navigateMoveLetterMainpage = ():void => {
    router.push(moveCoverLetterMainPage);
  };

  const actionButtons: BtnType.BaseProps[] = [
    {
      id: 'back-01',
      label: '뒤로가기',
      onClick: () => navigateMoveLetterMainpage(),
      sx: { fontSize: '2em' },
    },
    {
      id: 'write-02',
      label: '작성완료',
      onClick: () => handleDispatch(),
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
