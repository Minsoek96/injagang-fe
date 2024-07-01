import { IGetTemplate } from "@/types/template/TemplateType";
import React from "react";
import useTemplateStoreManager from "../../hooks/useTemplateStoreManager";
import styled from "styled-components";

interface TemplateItemProps {
  list: IGetTemplate;
}

const TemplateItem = ({ list }: TemplateItemProps) => {
  const { setItemInfo, selectedTemplate } = useTemplateStoreManager();
  const isSelected = list.templateId === selectedTemplate.templateId;

  return (
    <TemplateTitle onClick={() => setItemInfo(list)} isSelected={isSelected}>
      {list.title}
    </TemplateTitle>
  );
};

export default TemplateItem;

const TemplateTitle = styled.div<{ isSelected: boolean }>`
  font-size: ${({ isSelected }) => (isSelected ? "1.4rem" : "1.2rem")};
  font-weight: bold;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.2)};
  border-radius: 12px;
  transition: all ease-in 0.2s;
  cursor: pointer;
`;
