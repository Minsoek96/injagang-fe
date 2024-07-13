import { BiTrash } from 'react-icons/bi';

import styled from 'styled-components';
import { ColBox, ScrollBar } from '@/styles/GlobalStyle';

import { keys } from '@/src/shared/utils';
import useTemplateManager from '../../hooks/useTemplateManager';
import useTemplateStoreManager from '../../hooks/useTemplateStoreManager';

function NoTemplateSelected() {
  return <WarringMsg>현재 선택된 리스트가 없습니다.</WarringMsg>;
}

function TemplateDetail() {
  const { removeTemplateItem } = useTemplateManager();
  const { selectedTemplate } = useTemplateStoreManager();
  const isTemplateSelected = selectedTemplate.questions.length < 1;

  if (isTemplateSelected) return <NoTemplateSelected />;

  return (
    <TemplateDetailStyled>
      <Container>
        {selectedTemplate.questions.map((question, index) => (
          <QuestionStyle key={keys(question, index)}>
            {' '}
            {index + 1}
            .
            {question}
          </QuestionStyle>
        ))}
      </Container>
      <TrashIcon
        onClick={() => removeTemplateItem(selectedTemplate.templateId)}
      />
    </TemplateDetailStyled>
  );
}

export default TemplateDetail;
const TemplateDetailStyled = styled.div`
  position: relative;
  padding: 12px 25px;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  ${ScrollBar}
  overflow-y: auto;
  height: 100%;
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
