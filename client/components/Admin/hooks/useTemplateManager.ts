import { useCallback } from 'react';

import { useTemplateStore } from '@/store/template';
import { useAddTemplate, useDeleteTemplate } from '@/api/TEMPLATE/mutations';

const useTemplateManager = () => {
  const { setSelectedTemplate } = useTemplateStore();
  const { mutate: removeTemplate } = useDeleteTemplate();
  const { mutate: addTemplate } = useAddTemplate();

  const removeTemplateItem = useCallback((index: number) => {
    const resetCurTemplate = {
      templateId: 0,
      questions: [],
      title: '',
    };
    removeTemplate(index);
    setSelectedTemplate(resetCurTemplate);
  }, []);

  return {
    removeTemplateItem,
    addTemplate,
  };
};

export default useTemplateManager;
