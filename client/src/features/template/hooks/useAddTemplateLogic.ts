import { useState, useCallback } from 'react';

import useTemplateStoreManager from './useTemplateStoreManager';
import useTemplateManager from './useTemplateManager';

interface IAddTemplateList {
  templateTitle: string;
  templateQuestion: string[];
}

const MAX_QUESTIONS = 7;
const MIN_QUESTIONS = 1;
const INITIAL_TEMPLATE = {
  templateTitle: '',
  templateQuestion: [],
};

const useAddTemplateLogic = () => {
  const [templateList, setTemplateList] = useState<IAddTemplateList>(INITIAL_TEMPLATE);
  const { setIsAddTemplate } = useTemplateStoreManager();
  const { addTemplate } = useTemplateManager();
  const templateMinLength = templateList.templateQuestion.length <= MIN_QUESTIONS;
  const templateMaxLength = templateList.templateQuestion.length >= MAX_QUESTIONS;

  const handleQuestionChange = useCallback((index: number, value: string) => {
    setTemplateList((prev) => ({
      ...prev,
      templateQuestion: prev.templateQuestion.map((q, i) =>
        (i === index ? value : q)),
    }));
  }, []);

  const addQuestion = useCallback(() => {
    if (templateMaxLength) return;
    setTemplateList((prev) => ({
      ...prev,
      templateQuestion: [...prev.templateQuestion, ''],
    }));
  }, [templateMaxLength]);

  const removeLastQuestion = useCallback(() => {
    setTemplateList((prev) => ({
      ...prev,
      templateQuestion: prev.templateQuestion.slice(0, -1),
    }));
  }, []);

  const resetTemplateList = useCallback(() => {
    if (templateMinLength) return;
    setTemplateList(INITIAL_TEMPLATE);
  }, [templateMinLength]);

  const confirmTemplateCreation = useCallback(() => {
    const { templateTitle, templateQuestion } = templateList;

    addTemplate({ title: templateTitle, questions: templateQuestion });
    resetTemplateList();
    setIsAddTemplate(false);
  }, [templateList, setIsAddTemplate]);

  return {
    templateList,
    setTemplateList,
    handleQuestionChange,
    addQuestion,
    removeLastQuestion,
    resetTemplateList,
    confirmTemplateCreation,
    templateMinLength,
    templateMaxLength,
  };
};

export default useAddTemplateLogic;
