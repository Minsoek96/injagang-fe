import { styled } from 'styled-components';

import { SubmitHandler } from 'react-hook-form';

import {
  coverLetterMutation,
  coverLetterType,
  CoverLetterHeader,
  useTempStore,
  FormStyle as S,
} from '@/src/entities/coverLetter';

import { styleMixin, V } from '@/src/shared/styles';
import { Container } from '@/src/shared/ui';
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
    <CoverLetterCreatorContainer>
      <CoverLetterHeader title="자소설 쓰기" />
      <S.formContainer>
        <CreateForm movePage={moveCoverLetterMainPage} onSubmit={onSubmit} />
      </S.formContainer>
    </CoverLetterCreatorContainer>
  );
}

const CoverLetterCreatorContainer = styled(Container.ItemBase)`
  ${styleMixin.Column()};
  width: 100%;
  max-width: ${V.lgWidth};
`;
