import { PiBookLight } from 'react-icons/pi';

import {
  useCoverLetterStore,
  PreviewStyle as S,
} from '@/src/entities/coverLetter';

import { CoverLetterDetail } from './content';

export default function CoverLetterDetailLayout() {
  const selectedCoverLetter = useCoverLetterStore(
    (state) => state.selectedCoverLetter,
  );
  const { essayId } = selectedCoverLetter;

  if (essayId === 0) {
    return (
      <S.baseContainer>
        <S.emptyStateContainer>
          <S.emptyStateIcon><PiBookLight /></S.emptyStateIcon>
          <S.emptyStateMessage>아직 펼쳐보지 않은 페이지</S.emptyStateMessage>
          <S.emptyStateSubMessage>
            왼쪽 책갈피에서 당신의 이야기를 선택해 읽어보세요
          </S.emptyStateSubMessage>
        </S.emptyStateContainer>
      </S.baseContainer>
    );
  }

  return <CoverLetterDetail essayId={essayId} />;
}
