import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { BiPlus } from 'react-icons/bi';

import styled from 'styled-components';

import { v4 as uuid4 } from 'uuid';

import { BaseButton } from '@/src/shared/components/button';
import { V, styleMixin } from '@/src/shared/styles';
import { ComboBox } from '@/src/shared/components/combobox';
import CoverLetterQuestionItems from './CoverLetterQuestionItems';

import useCoverLetterCreatorLogic from '../hooks/useCoverLetterCreatorLogic';
import useControlTemplate from '../hooks/useControlTemplate';

const moveCoverLetterMainPage = '/coverLetter';

function CoverLetterCreator() {
  const router = useRouter();
  const {
    qnaList,
    setQnAList,
    deleteQnAList,
    changeQnAList,
    addQnAList,
    handleDispatch,
    setCoverLetterTitle,
    coverLetterTitle,
  } = useCoverLetterCreatorLogic();

  const {
    selectedTemplateTitle,
    changeSelectedTemplate,
    selectedTemplate,
    templateTitles,
  } = useControlTemplate();

  useEffect(() => {
    const resetSelectedTemplateList = selectedTemplate.questions.map((a) => ({
      qnaId: uuid4(),
      question: a,
      answer: '',
    }));
    setQnAList(resetSelectedTemplateList);
  }, [selectedTemplate]);

  return (
    <CoverLetterCreatorContainer>
      <MainTitle>자소서 작성하기</MainTitle>
      <CoverLetterTitle
        value={coverLetterTitle}
        onChange={(e) => setCoverLetterTitle(e.target.value)}
        placeholder="자소서 제목"
      />
      <ComboBox
        Size={{ width: `${V.xlItemWidth}`, height: '40px' }}
        value={selectedTemplateTitle}
        optionList={templateTitles}
        onChange={changeSelectedTemplate}
      />
      {qnaList.map((qna) => (
        <CoverLetterQuestionItems
          key={qna.qnaId}
          item={qna}
          onDelete={deleteQnAList}
          onUpdate={changeQnAList}
        />
      ))}
      <BiPlusStyled onClick={addQnAList} />
      <ControllerBtns>
        <BaseButton
          $Size={{ width: '150px', font: '20px' }}
          onClick={() => router.push(moveCoverLetterMainPage)}
        >
          뒤로가기
        </BaseButton>
        <BaseButton
          $Size={{ width: '150px', font: '20px' }}
          onClick={() => handleDispatch()}
        >
          작성완료
        </BaseButton>
      </ControllerBtns>
    </CoverLetterCreatorContainer>
  );
}

export default CoverLetterCreator;
const CoverLetterCreatorContainer = styled.div`
  ${styleMixin.Column()}
  width: 100%;
`;

const MainTitle = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 30px;
  text-decoration-line: underline;
`;

const CoverLetterTitle = styled.input`
  width: ${V.xlItemWidth};
  height: 40px;
  border-radius: 5px;
  border-color: black;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 1px 0.5px rgba(0, 0, 0, 09);
  margin-bottom: 15px;
`;

const ControllerBtns = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${V.xlItemWidth};
`;

const BiPlusStyled = styled(BiPlus)`
  margin: 40px auto;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
