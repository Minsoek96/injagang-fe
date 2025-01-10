import { PreviewStyle as S } from '@/src/entities/coverLetter';
import { MainButton } from '@/src/shared/ui';

type Props = {
  onReset: () => void;
};
export default function CoverLetterListFallback({ onReset }: Props) {
  return (
    <S.container>
      <S.emptyContainer>
        <S.emptyTitle>앗! 자기소개서를 불러오는데 실패했어요 😅</S.emptyTitle>
        <S.emptyText>일시적인 오류일 수 있으니 다시 시도해 주세요</S.emptyText>
        <MainButton label="새로고침" onClick={onReset} variant="signature" sx={{ marginTop: '1rem' }} />
      </S.emptyContainer>
    </S.container>
  );
}
