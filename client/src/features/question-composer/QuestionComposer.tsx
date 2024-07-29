import { useState } from 'react';

import styled from 'styled-components';
import { BaseArea } from '@/src/shared/components/textarea';

import { BaseCard } from '@/src/shared/components/card';

import { BaseButton } from '@/src/shared/components/button';

import { BaseInput as QuestionTitle } from '@/src/shared/components/input';

import { styleMixin } from '@/src/shared/styles';

import { ComboBox } from '@/src/shared/components/combobox';
import CoverLetterDetail from '@/src/features/question-composer/CoverLetterDetail';

import { useWriteBoard } from '@/src/entities/qnaboard/mutaions';
import { useFetchCoverLetter } from '@/src/entities/coverLetter/queries';

function QuestionComposer() {
  const { data: coverLtters = [] } = useFetchCoverLetter();
  const { mutate: writeBoard } = useWriteBoard();

  const [coverLetterTitle, setCoverLetterTitle] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [essayId, setEssayId] = useState<number>(0);

  const changeCoverLetter = (changeTitle: string) => {
    setCoverLetterTitle(changeTitle);
    const findEssay = coverLtters?.find((list) => list.title === changeTitle);
    if (findEssay) setEssayId(findEssay?.essayId);
  };

  const handleSubmit = () => {
    const data = {
      title,
      content,
      essayId,
    };
    // TOME :: QNA MANAGER 생성시 대처
    writeBoard(data);
    // navigateToList();
  };

  return (
    <BaseCard $size={{ width: '80%', height: '80%', flex: 'row' }}>
      <SwitchContainer>
        <LeftContainer>
          <QuestionTitle
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ComboBox
            Size={{ width: '100%', height: '40px' }}
            value={coverLetterTitle}
            onChange={(e) => changeCoverLetter(e)}
            optionList={coverLtters}
          />
          <BaseArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <BaseButton
            $Size={{ width: '100%', font: '15px' }}
            onClick={handleSubmit}
          >
            작성완료
          </BaseButton>
        </LeftContainer>
        <RigthContainer>
          <CoverLetterDetail essayId={essayId} />
        </RigthContainer>
      </SwitchContainer>
    </BaseCard>
  );
}

export default QuestionComposer;
const SwitchContainer = styled.div`
  ${styleMixin.Flex()}
  width: 100%;
  height: 90%;
  gap: 30px;
  @media screen and (max-width: 1200px) {
    ${styleMixin.Column()}
  }
`;

const LeftContainer = styled.div`
  ${styleMixin.Column()}
  width: 50%;
  height: 100%;
  input {
    padding: 8px;
    width: 100%;
    margin-bottom: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 50%;
  }
`;

const RigthContainer = styled.div`
  ${styleMixin.Column()}
  height: 100%;
  width: 50%;
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 50%;
  }
`;
