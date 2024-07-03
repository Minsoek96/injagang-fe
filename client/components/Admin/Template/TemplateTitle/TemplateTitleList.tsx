import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";
import { BiPlus } from "react-icons/bi";

import TemplateItem from "./TemplateTitleItem";

import useTemplateStoreManager from "../../hooks/useTemplateStoreManager";
import { useFetchTemplate } from "@/api/TEMPLATE/queries";

const TemplateTitleList = () => {
  const { data: templateList } = useFetchTemplate();

  const { isAddTemplate, setIsAddTemplate } = useTemplateStoreManager();

  return (
    <TemplateTtileContainer>
      {templateList?.map(item => (
        <TemplateItem key={item.templateId} list={item} />
      ))}
      {!isAddTemplate && (
        <BiPlus onClick={() => setIsAddTemplate(true)}></BiPlus>
      )}
    </TemplateTtileContainer>
  );
};

export default TemplateTitleList;

const TemplateTtileContainer = styled.div`
  ${ColBox}
  justify-content: center;
  gap: 8px;
  width: 50%;
  height: 100%;
  svg {
    margin-top: 10px;
    font-size: 35px;
    cursor: pointer;
  }
  svg:hover {
    color: red;
  }

  @media screen and (max-width: 800px) {
    border-right: 0px;
    width: 100%;
    height: 50%;
  }
`;
