import styled from 'styled-components';

import { templateType, useTemplateStore } from '@/src/entities/template';

interface TemplateItemProps {
  list: templateType.IGetTemplate;
}

function TemplateItem({ list }: TemplateItemProps) {
  const { setSelectedTemplate, selectedTemplate } = useTemplateStore();
  const isSelected = list.templateId === selectedTemplate.templateId;

  return (
    <TemplateTitle
      onClick={() => setSelectedTemplate(list)}
      $isSelected={isSelected}
    >
      {list.title}
    </TemplateTitle>
  );
}

export default TemplateItem;

const TemplateTitle = styled.div<{ $isSelected: boolean }>`
  scale: ${({ $isSelected }) => ($isSelected ? '1' : '1.2')};
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1.4;
  opacity: ${({ $isSelected }) => ($isSelected ? 1 : 0.2)};
  border-radius: 12px;
  transition: all ease-in 0.2s;
  cursor: pointer;
`;
