import { useCallback } from 'react';

import { templateType, useTemplateStore } from '@/src/entities/template';

const useTemplateStoreManager = () => {
  const {
    selectedTemplate,
    isAddTemplate,
    setAddTemplateToggle,
    setSelectedTemplate,
    clearCurTemplate,
  } = useTemplateStore();

  const setItemInfo = useCallback((itemList: templateType.IGetTemplate) => {
    setSelectedTemplate(itemList);
  }, []);

  const setIsAddTemplate = useCallback((isAdd: boolean) => {
    setAddTemplateToggle(isAdd);
  }, []);

  return {
    selectedTemplate,
    isAddTemplate,
    setItemInfo,
    setIsAddTemplate,
    clearCurTemplate,
  };
};

export default useTemplateStoreManager;
