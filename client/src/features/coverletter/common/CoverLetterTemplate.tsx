import styled from 'styled-components';

import { BiPlus } from 'react-icons/bi';

import {
  BtnType,
  ComboBox,
  HideSvg,
  MainButton,
  Spinner,
  Container,
  MainInput,
} from '@/src/shared/components';

import { V, styleMixin } from '@/src/shared/styles';

import { QnaItem } from '@/src/features/coverletter/common/reducerType';

import CoverLetterQuestionItems from './CoverLetterQuestionItems';

type Props = {
  mainTitle: string;
  coverLetterTitle: string;
  setCoverLetterTitle: (title: string) => void;
  qnaList: QnaItem[];
  deleteQnAList: (targetID: string | number) => void;
  changeQnAList: (
    targetID: string | number,
    newQuestion: string,
    newAnswer: string
  ) => void;
  addQnAList: () => void;
  actionButtons: BtnType.BaseProps[];
  isLoading: boolean;
  isTemplate: boolean;
  selectedTemplateTitle?: string;
  templateTitles?: { title: string }[];
  changeSelectedTemplate?: (selected: string) => void;
};

/** 자소서 생성-삭제 공용 템플릿  */
export default function CoverLetterTeamplte({
  mainTitle,
  coverLetterTitle,
  setCoverLetterTitle,
  qnaList,
  deleteQnAList,
  changeQnAList,
  addQnAList,
  actionButtons,
  isLoading,
  isTemplate,
  selectedTemplateTitle = '',
  templateTitles = [],
  changeSelectedTemplate = () => {},
}: Props) {
  if (isLoading) return <Spinner />;

  return (
    <CoverLetterCreatorContainer>
      <MainTitle>{mainTitle}</MainTitle>
      <MainInput
        value={coverLetterTitle}
        onChange={setCoverLetterTitle}
        placeholder="자소서 제목"
        sx={{ width: '100%', marginBottom: '1.5rem' }}
      />
      {isTemplate && (
        <ComboBox
          sx={{ maxWidth: '100%', height: '4rem' }}
          value={selectedTemplateTitle}
          optionList={templateTitles}
          onChange={changeSelectedTemplate}
        />
      )}
      {qnaList.map((qna) => (
        <CoverLetterQuestionItems
          key={qna.qnaId}
          item={qna}
          onDelete={deleteQnAList}
          onUpdate={changeQnAList}
        />
      ))}
      <HideSvg
        label="리스트 추가"
        onClick={addQnAList}
        Logo={<BiPlus />}
        sx={{ fontSize: '3.5rem', margin: '1rem' }}
      />
      <ControllerBtns>
        {actionButtons.map((item) => (
          <MainButton
            key={item.id}
            label={item.label}
            onAction={item.onAction}
            sx={item.sx}
          />
        ))}
      </ControllerBtns>
    </CoverLetterCreatorContainer>
  );
}

const CoverLetterCreatorContainer = styled(Container.ItemBase)`
  ${styleMixin.Column()}
  width: 100%;
  max-width: ${V.lgWidth};
`;

const MainTitle = styled.h2`
  ${styleMixin.Flex('flex-start', 'flex-start')}
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
  text-decoration: underline;
  text-underline-position: under;
  text-underline-offset: 0;
`;

const ControllerBtns = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 0.7rem;

  }
`;
