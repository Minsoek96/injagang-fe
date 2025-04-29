import { useRouter } from 'next/router';

import { SubmitHandler } from 'react-hook-form';

import {
  coverLetterType,
  coverLetterQueries,
  FormStyle as S,
} from '@/src/entities/coverLetter';

import { usePageRouter } from '@/src/shared/hooks';

import useCoverLetterManager from '../model/useCoverLetterManager';
import EditForm from './edit-form/EditForm';

export default function CoverLetterCreator() {
  const router = useRouter();
  const { id } = router.query;
  const { moveCoverLetterMainPage } = usePageRouter();
  const { changeCoverLetter } = useCoverLetterManager();
  const { data: coverLetter } = coverLetterQueries.useFetchDetailCoverLetter(
    Number(id),
  );

  /** field 반영 */
  const onSubmit: SubmitHandler<coverLetterType.ICoverLetter> = (data) => {
    const { title, qnaList } = data;
    changeCoverLetter(Number(id), title, qnaList);
  };

  return (
    <S.formContainer>
      <EditForm
        movePage={moveCoverLetterMainPage}
        onSubmit={onSubmit}
        coverLetters={coverLetter}
      />
    </S.formContainer>
  );
}
