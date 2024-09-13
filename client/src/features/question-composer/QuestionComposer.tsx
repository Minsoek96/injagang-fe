import { memo, useState } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import {
  MainButton,
  MainInput,
  ComboBox,
  Container,
  Spinner,
} from '@/src/shared/ui';

import { styleMixin, V } from '@/src/shared/styles';

import CoverLetterDetail from '@/src/features/question-composer/CoverLetterDetail';

import { useWriteBoard } from '@/src/entities/qnaboard/mutaions';
import { useFetchCoverLetter } from '@/src/entities/coverLetter/queries';

import dynamic from 'next/dynamic';

const MarkdownEditor = dynamic(
  () => import('@/src/shared/ui/markdown/MarkdownEditor'),
  {
    loading: () => (
      <Spinner message="편집기를 불러오는 중입니다." />
    ),
    ssr: false,
  },
);

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
          label="대표자소서선택"
          hideLabel
          selectedItem={coverLetterTitle}
          items={coverLtters.map((item) => item.title)}
          itemToId={(item) => item || ''}
          itemToText={(item) => item || ''}
          onChange={(value) => value && changeCoverLetter(value)}
        />
        <MarkdownEditor
          onChange={setContent}
          placeholder="질문을 작성해주세요."
        />
        <MainButton
          label="작성완료"
          onClick={handleSubmit}
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
  @media screen and (max-width: ${V.mediaWeb}) {
    ${styleMixin.Column('flex-start')}
  }
`;
