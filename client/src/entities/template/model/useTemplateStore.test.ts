import { sampleGetTemplate } from '@/fixutures/entities/template';
import { act } from '@testing-library/react';
import useTemplateStore from './useTemplateStore';

describe('useTemplateStore', () => {
  it('유저가 선택한 템플릿의 정보를 저장', () => {
    act(() => {
      useTemplateStore.getState().setSelectedTemplate(sampleGetTemplate[0]);
    });
    const { selectedTemplate } = useTemplateStore.getState();
    expect(selectedTemplate).toEqual(sampleGetTemplate[0]);
  });

  it('템플릿 추가 버튼 토글 상태', () => {
    act(() => {
      useTemplateStore.getState().setAddTemplateToggle(true);
    });
    const { isAddTemplate } = useTemplateStore.getState();
    expect(isAddTemplate).toEqual(true);
  });

  it('모든 상태를 초기화 한다.', () => {
    act(() => {
      useTemplateStore.getState().clearCurTemplate();
    });
    const { isAddTemplate, selectedTemplate } = useTemplateStore.getState();
    expect(selectedTemplate).toEqual({
      templateId: 0,
      title: '',
      questions: [],
    });
    expect(isAddTemplate).toEqual(false);
  });
});
