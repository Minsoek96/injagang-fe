import { useState } from 'react';

import useTemplateStoreManager from '@/src/features/template/hooks/useTemplateStoreManager';

import { useFetchTemplate } from '@/src/entities/template/queries';

const useControlTemplate = () => {
  const { data: templateList = [] } = useFetchTemplate();
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState<string>('');
  const { selectedTemplate, setItemInfo } = useTemplateStoreManager();

  const changeSelectedTemplate = (seleted: string) => {
    const searchTemplate = templateList?.find((item) => item.title === seleted);
    const initTemplate = {
      templateId: 100001,
      title: seleted,
      questions: [''],
    };
    if (searchTemplate) {
      setItemInfo(searchTemplate);
    } else if (seleted === '커스텀 자소서') {
      setItemInfo(initTemplate);
    }
    setSelectedTemplateTitle(seleted);
  };

  const templateTitles = templateList
    .map((q) => ({ title: q.title }))
    .concat({ title: '커스텀 자소서' });

  return {
    selectedTemplateTitle,
    changeSelectedTemplate,
    selectedTemplate,
    templateTitles,
  };
};

export default useControlTemplate;
