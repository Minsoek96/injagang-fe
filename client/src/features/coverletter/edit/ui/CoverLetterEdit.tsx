import { useRouter } from 'next/router';

import { styled } from 'styled-components';

import { SubmitHandler } from 'react-hook-form';

import {
  coverLetterType,
  coverLetterQueries,
} from '@/src/entities/coverLetter';

import { styleMixin, V } from '@/src/shared/styles';
import { Container } from '@/src/shared/ui';
import { usePageRouter } from '@/src/shared/hooks';

import useCoverLetterManager from '../model/useCoverLetterManager';
import EditForm from './edit-form/EditForm';

export default function CoverLetterCreator() {
  const router = useRouter();
  const { id } = router.query;
  const { moveCoverLetterMainPage } = usePageRouter();
  const { changeCoverLetter, deleteCoverLetter } = useCoverLetterManager();
  const { data: coverLetter } = coverLetterQueries.useFetchDetailCoverLetter(Number(id));

  /** field 반영 */
  const onSubmit: SubmitHandler<coverLetterType.ICoverLetter> = (data) => {
    const { title, qnaList } = data;
    changeCoverLetter(Number(id), title, qnaList);
  };

  return (
    <CoverLetterCreatorContainer>
      <MainTitle>자기소개서 수정</MainTitle>
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
