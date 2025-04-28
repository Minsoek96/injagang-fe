import { styled } from 'styled-components';

import { SubmitHandler } from 'react-hook-form';

import {
  coverLetterMutation,
  coverLetterType,
  useTempStore,
} from '@/src/entities/coverLetter';

import { styleMixin, V } from '@/src/shared/styles';
import { Container } from '@/src/shared/ui';
import { usePageRouter } from '@/src/shared/hooks';

import CreateHeader from '@/src/features/coverletter/new/ui/header/CreateHeader';
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
      <CreateHeader title="자소설 쓰기" />
      <CreatorContainer>
        <CreateForm movePage={moveCoverLetterMainPage} onSubmit={onSubmit} />
      </CreatorContainer>
    </CoverLetterCreatorContainer>
  );
}

const CoverLetterCreatorContainer = styled(Container.ItemBase)`
  ${styleMixin.Column()};
  width: 100%;
  max-width: ${V.lgWidth};
`;

const CreatorContainer = styled.div`
  ${styleMixin.Column()};
  padding: 2rem 3rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-left: 1.5rem solid ${(props) => props.theme.colors.signatureColor};
  box-shadow: ${V.boxShadow3};
`;
