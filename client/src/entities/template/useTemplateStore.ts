import { create } from 'zustand';
import { IGetTemplate } from '@/src/entities/template/type';

interface InitiaState {
  selectedTemplateList: IGetTemplate;
}

const initialState: InitiaState = {
  selectedTemplateList: {
    templateId: 0,
    title: '',
    questions: [],
  },
};

type State = {
  isAddTemplate: boolean;
  selectedTemplate: IGetTemplate;
};

type Action = {
  setSelectedTemplate: (template: IGetTemplate) => void;
  setAddTemplateToggle: (isAdd: boolean) => void;
  clearCurTemplate: () => void;
};

const useTemplateStore = create<State & Action>((set) => ({
  isAddTemplate: false,
  selectedTemplate: initialState.selectedTemplateList,

  setSelectedTemplate: (template: IGetTemplate) =>
    set({
      selectedTemplate: template,
    }),

  setAddTemplateToggle: (isAdd: boolean) =>
    set({
      isAddTemplate: isAdd,
    }),

  clearCurTemplate: () =>
    set({
      selectedTemplate: initialState.selectedTemplateList,
      isAddTemplate: false,
    }),
}));

export default useTemplateStore;
