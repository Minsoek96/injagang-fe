import { useCallback } from 'react';

import { useTemplateStore, templateMutations } from '@/src/entities/template';

const useTemplateManager = () => {
  const { setSelectedTemplate } = useTemplateStore();
  const { mutate: removeTemplate } = templateMutations.useDeleteTemplate();
  const { mutate: addTemplate } = templateMutations.useAddTemplate();

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
