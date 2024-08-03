import { memo, useState } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import {
  MainButton,
  MainInput,
  ComboBox,
  MarkdownEditor,
  Container,
} from '@/src/shared/components';

import { styleMixin } from '@/src/shared/styles';

import CoverLetterDetail from '@/src/features/question-composer/CoverLetterDetail';

import { useWriteBoard } from '@/src/entities/qnaboard/mutaions';
import { useFetchCoverLetter } from '@/src/entities/coverLetter/queries';

function QuestionComposer() {
  const router = useRouter();
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

  const navigateToList = () => {
    router.push('/qna/list');
  };

  const handleSubmit = () => {
    const data = {
      title,
      content,
      essayId,
    };
    writeBoard(data);
    navigateToList();
  };

  return (
    <ComposerContainer>
      <Container.ArticleCard $size={{ width: '100%', height: '87vh' }}>
        <MainInput
          value={title}
          onChange={setTitle}
          sx={{ width: '100%', marginBottom: '1rem' }}
        />
        <ComboBox
          Size={{ width: '100%', height: '4rem' }}
          value={coverLetterTitle}
          onChange={(e) => changeCoverLetter(e)}
          optionList={coverLtters}
        />
        <MarkdownEditor
          onChange={setContent}
          placeholder="질문을 작성해주세요."
        />
        <MainButton
          label="작성완료"
          onAction={handleSubmit}
          sx={{
            width: '100%',
            minHeight: '4rem',
            fontSize: '1.6rem',
            backgroundColor: '#ff8800',
          }}
        />
      </Container.ArticleCard>
      <Container.ArticleCard $size={{ width: '100%', height: '87vh' }}>
        <CoverLetterDetail essayId={essayId} />
      </Container.ArticleCard>
    </ComposerContainer>
  );
}

export default memo(QuestionComposer);

const ComposerContainer = styled(Container.ItemBase)`
  ${styleMixin.Flex('flex-start')}
  width: 100%;
  height: 100%;
  gap: 30px;
  @media screen and (max-width: 1200px) {
    ${styleMixin.Column('flex-start')}
  }
`;
