import { useCallback } from 'react';

import { BiTrash } from 'react-icons/bi';

import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import { keys } from '@/src/shared/utils';

import { templateMutations, useTemplateStore } from '@/src/entities/template';

import TemplateItem from './TemplateItem';

function TemplateDetail() {
  const { mutate: removeTemplate } = templateMutations.useDeleteTemplate();
  const { clearCurTemplate, selectedTemplate } = useTemplateStore();

  const removeTemplateItem = useCallback((index: number) => {
    removeTemplate(index);
    clearCurTemplate();
  }, []);

  const isTemplateSelected = selectedTemplate.questions.length < 1;

  if (isTemplateSelected) return <WarringMsg>현재 선택된 리스트가 없습니다.</WarringMsg>;

  return (
    <TemplateDetailStyled>
      {selectedTemplate.questions.map((question, index) => (
        <TemplateItem
          key={keys(question, index)}
          question={question}
          index={index}
        />
      ))}
      <TrashIcon
        aria-label="delete-Template"
        onClick={() => removeTemplateItem(selectedTemplate.templateId)}
      />
    </TemplateDetailStyled>
  );
}

export default TemplateDetail;
const TemplateDetailStyled = styled.div`
  position: relative;
  padding: 0.5em 1em;
  width: 100%;
  height: 100%;
`;

const TrashIcon = styled(BiTrash)`
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-size: 2rem;
  color: #ff4757;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #ff6b81;
  }
`;

const WarringMsg = styled.div`
  ${styleMixin.Column()}
  justify-content: center;
  width: 100%;
  height: 100%;
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;
