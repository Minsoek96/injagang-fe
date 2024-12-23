import styled from 'styled-components';

import { GoFile } from 'react-icons/go';

import { styleMixin } from '@/src/shared/styles';
import {
  useCoverLetterStore,
  coverLetterQueries,
  PreviewStyle as S,
} from '@/src/entities/coverLetter';

import CoverLetterItem from './CoverLetterItem';

/**
 * CoverLetterList 유저의 자소서 목록 리스트
 * - 유저가 작성한 자소서 목록 리스트를 가져온다.
 */
function CoverLetterList() {
  const { data: coverLetters } = coverLetterQueries.useFetchCoverLetter();
  const { selectedCoverLetter } = useCoverLetterStore();

  if (!coverLetters?.length) {
    return (
      <S.container>
        <S.emptyContainer>
          <GoFile />
          <S.emptyTitle>작성된 자소서가 없습니다.</S.emptyTitle>
          <S.emptyText>새로운 자기소개서를 작성해보세요</S.emptyText>
        </S.emptyContainer>
      </S.container>
    );
  }

  return (
    <S.container>
      <ListHeader>
        <ListTitle>자기소개서 목록</ListTitle>
      </ListHeader>
      <ListContent>
        {coverLetters?.map((item) => (
          <CoverLetterItem
            key={item.essayId}
            item={item}
            selectedCoverLetter={selectedCoverLetter}
          />
        ))}
      </ListContent>
    </S.container>
  );
}

export default CoverLetterList;

const ListHeader = styled.div`
  width: 100%;
  padding: 1.2rem 1.6rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.mainLine};
`;

const ListTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
`;

const ListContent = styled.ul`
  ${styleMixin.Column('flex-start', 'flex-start')}
  ${styleMixin.ScrollBar}
  width: 100%;
  height: 100%;
  padding: 0.8rem;
  gap: 0.4rem;
`;
