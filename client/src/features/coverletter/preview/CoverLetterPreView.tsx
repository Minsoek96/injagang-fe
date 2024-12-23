import { TbMoodEmpty } from 'react-icons/tb';

import {
  PreviewStyle as S,
  useCoverLetterStore,
} from '@/src/entities/coverLetter';

import { keys } from '@/src/shared/utils';

import CoverLetterPreViewItem from './CoverLetterPreViewItem';

/**
 * CoverLetterItems 유저가 선택한 자소서 질문 리스트 UI
 * - 유저가 선택한 자소서의 질문 리스트를 출력
 */
function CoverLetterPreView() {
  const { selectedCoverLetter } = useCoverLetterStore();

  if (!selectedCoverLetter.questions.length) {
    return (
      <S.container>
        <S.emptyContainer>
          <TbMoodEmpty />
          <S.emptyTitle>선택된 자소서가 없습니다.</S.emptyTitle>
          <S.emptyText>자소서를 선택해주세요</S.emptyText>
        </S.emptyContainer>
      </S.container>
    );
  }
  return (
    <S.container>
      {selectedCoverLetter.questions.map((question, idx) => (
        <CoverLetterPreViewItem
          key={keys(question, idx)}
          question={question}
          idx={idx}
        />
      ))}
    </S.container>
  );
}

export default CoverLetterPreView;
