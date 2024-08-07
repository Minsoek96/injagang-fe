import { useState } from 'react';

import useTemplateStoreManager from '@/src/features/template/hooks/useTemplateStoreManager';

import { useFetchTemplate } from '@/src/entities/template/queries';

/** TemplateStore에서 상태를 가져와 커스텀하는 로직 */
const useControlTemplate = () => {
  const { data: templateList = [] } = useFetchTemplate();
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState<string>('');
  const { selectedTemplate, setItemInfo } = useTemplateStoreManager();

  /** 선택된 템플릿탐색하고, 없을시 초기 템플릿 상태 반영 */
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

  /** 템플릿에서 필요한 부분을 잘라냄 */
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
