import { useState } from 'react';
import { UseFieldArrayAppend, UseFormReset } from 'react-hook-form';

import { v4 as uuid4 } from 'uuid';

import { useFetchTemplate } from '@/src/entities/template/queries';

import { ComboBox } from '@/src/shared/ui';
import { coverLetterType } from '@/src/entities/coverLetter';

type Props = {
    append: UseFieldArrayAppend<coverLetterType.ICoverLetter, 'qnaList'>,
    reset: UseFormReset<coverLetterType.ICoverLetter>,
}

export default function TemplateSelector({ append, reset }:Props) {
  const { data: templateList = [] } = useFetchTemplate();

  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState<string>('');

  const changeSelectedTemplate = (selctedTemplate: string) => {
    setSelectedTemplateTitle(selctedTemplate);
    const template = templateList.find(
      (item) => item.title === selctedTemplate,
    );
    if (template) {
      reset({ qnaList: [] });
      template.questions.forEach((item) => {
        append({ question: item, answer: '', qnaId: uuid4() });
      });
    }
  };

  return (
    <ComboBox
      sx={{ maxWidth: '100%', height: '4rem' }}
      label="자소서 선택"
      placeholder="템플릿 선택(선택사항)"
      hideLabel
      selectedItem={selectedTemplateTitle}
      items={templateList.map((item) => item.title)}
      itemToId={(item) => item || ''}
      itemToText={(item) => item || ''}
      onChange={(value) => value && changeSelectedTemplate(value)}
    />
  );
}
