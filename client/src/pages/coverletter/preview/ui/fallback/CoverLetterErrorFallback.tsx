import { PreviewStyle as S } from '@/src/entities/coverLetter';
import { MainButton } from '@/src/shared/ui';

type ErrorMessage = {
  title : string;
  subTitle: string;
}

type Props = {
  onReset: () => void;
  message: ErrorMessage;
};
export default function CoverLetterErrorFallback({ onReset, message }: Props) {
  const { title, subTitle } = message;
  return (
    <S.baseContainer>
      <S.emptyStateContainer>
        <S.emptyStateMessage>{title}</S.emptyStateMessage>
        <S.emptyStateSubMessage>{subTitle}</S.emptyStateSubMessage>
        <MainButton label="새로고침" onClick={onReset} variant="signature" sx={{ marginTop: '1rem' }} />
      </S.emptyStateContainer>
    </S.baseContainer>
  );
}
