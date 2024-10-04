import { styled } from 'styled-components';

import { SubmitHandler } from 'react-hook-form';

import {
  coverLetterType,
  coverLetterQueries,
} from '@/src/entities/coverLetter';

import { styleMixin, V } from '@/src/shared/styles';
import { Container, Spinner } from '@/src/shared/ui';
import { usePageRouter } from '@/src/shared/hooks';

import { useRouter } from 'next/router';
import { useCoverLetterManager } from '@/src/features/coverletter/hooks';
import EditForm from './EditForm';

export default function CoverLetterCreator() {
  const { moveCoverLetterMainPage } = usePageRouter();
  const { changeCoverLetter, deleteCoverLetter } = useCoverLetterManager();
  const router = useRouter();
  const { id } = router.query;
  const { data: coverLetter, isLoading } = coverLetterQueries.useFetchDetailCoverLetter(Number(id));

  /** field 반영 */
  const onSubmit: SubmitHandler<coverLetterType.ICoverLetter> = (data) => {
    const { title, qnaList } = data;
    changeCoverLetter(Number(id), title, qnaList);
  };

  if (isLoading) return <Spinner message="데이터를 불러오는 중입니다." />;

  return (
    <CoverLetterCreatorContainer>
      <MainTitle>자기소개서 작성</MainTitle>
      <EditForm
        movePage={moveCoverLetterMainPage}
        onSubmit={onSubmit}
        coverLetters={coverLetter}
        onDelete={() => deleteCoverLetter(Number(id))}
      />
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
