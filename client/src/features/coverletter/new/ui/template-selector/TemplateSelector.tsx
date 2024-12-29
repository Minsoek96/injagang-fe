import { useState } from 'react';
import { UseFieldArrayAppend, UseFormReset } from 'react-hook-form';

import { ComboBox } from '@/src/shared/ui';
import { coverLetterType } from '@/src/entities/coverLetter';
import { templateQueries } from '@/src/entities/template';

type Props = {
  append: UseFieldArrayAppend<coverLetterType.IWriteCoverLetter, 'qnaList'>;
  reset: UseFormReset<coverLetterType.IWriteCoverLetter>;
};

export default function TemplateSelector({ append, reset }: Props) {
  const { data: templateList = [] } = templateQueries.useFetchTemplate();

  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState<string>('');

  const changeSelectedTemplate = (selctedTemplate: string) => {
    setSelectedTemplateTitle(selctedTemplate);
    const template = templateList.find(
      (item) => item.title === selctedTemplate,
    );
    if (template) {
      reset({ qnaList: [] });
      template.questions.forEach((item) => {
        append({ question: item, answer: '' });
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
