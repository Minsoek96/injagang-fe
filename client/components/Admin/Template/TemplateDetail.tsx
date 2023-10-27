import React from "react";
import useUserTemplateManager from "../hooks/useUserTemplateManager";
import { BiTrash } from "react-icons/bi";
import useTemplateManager from "../hooks/useTemplateManager";
import styled from "styled-components";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";

const TemplateDetail = () => {
  const { removeTemplateItem } = useTemplateManager();
  const { selectedTemplateList } = useUserTemplateManager();
  const isTemplateSelected = selectedTemplateList.questions.length < 1;
  const NoTemplateSelected = () => {
    return <WarringMsg>현재 선택된 리스트가 없습니다.</WarringMsg>;
  };

  if (isTemplateSelected) return <NoTemplateSelected />;

  return (
    <TemplateDetailStyled>
      <Container>
        {selectedTemplateList.questions.map((question, index) => (
          <QuestionStyle key={index}>
            {" "}
            {index + 1}. {question}
          </QuestionStyle>
        ))}
      </Container>
      <TrashIcon
        onClick={() => removeTemplateItem(selectedTemplateList.templateId)}
      />
    </TemplateDetailStyled>
  );
};

export default TemplateDetail;
const TemplateDetailStyled = styled.div`
  position: relative;
  padding: 20px 12px;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  ${ScrollBar}
  overflow-y: auto;
`;

const QuestionStyle = styled.div`
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const TrashIcon = styled(BiTrash)`
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-size: 24px;
  color: #ff4757;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #ff6b81;
  }
`;

const WarringMsg = styled.div`
  ${ColBox}
  justify-content: center;
  width: 100%;
  height: 100%;
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;
