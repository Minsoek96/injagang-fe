import { SubmitHandler } from 'react-hook-form';

import {
  coverLetterMutation,
  coverLetterType,
  useTempStore,
  FormStyle as S,
} from '@/src/entities/coverLetter';

import { usePageRouter } from '@/src/shared/hooks';

import CreateForm from './create-form/CreateForm';

export default function CoverLetterCreator() {
  const { moveCoverLetterMainPage } = usePageRouter();
  const { mutate } = coverLetterMutation.useWriteCoverLetter();

  const { setDraft, clearDraft } = useTempStore();

  /** field 반영 */
  const onSubmit: SubmitHandler<coverLetterType.IWriteCoverLetter> = (data) => {
    mutate(data, {
      onSuccess: () => {
        clearDraft();
        moveCoverLetterMainPage();
      },
      onError: () => {
        setDraft(data);
      },
    });
  };

  return (
    <S.formContainer>
      <CreateForm movePage={moveCoverLetterMainPage} onSubmit={onSubmit} />
    </S.formContainer>
  );
}
