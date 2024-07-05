import { useCallback } from 'react';

import { IGetTemplate } from '@/types/template/TemplateType';
import { useTemplateStore } from '@/store/template';

const useTemplateStoreManager = () => {
  const {
    selectedTemplate,
    isAddTemplate,
    setAddTemplateToggle,
    setSelectedTemplate,
    clearCurTemplate,
  } = useTemplateStore();

  const setItemInfo = useCallback((itemList: IGetTemplate) => {
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
