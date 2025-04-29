import styled from 'styled-components';

import { GoFile } from 'react-icons/go';

import { styleMixin, V } from '@/src/shared/styles';
import {
  useCoverLetterStore,
  coverLetterQueries,
  PreviewStyle as S,
  coverLetterMutation,
} from '@/src/entities/coverLetter';

import CoverLetterItem from './CoverLetterItem';

/**
 * CoverLetterList 유저의 자소서 목록 리스트
 * - 유저가 작성한 자소서 목록 리스트를 가져온다.
 */
function CoverLetterList() {
  const { data: coverLetters } = coverLetterQueries.useFetchCoverLetter();
  const { mutate: removeCoverLetter } = coverLetterMutation.useDeleteCoverLetter();
  const { selectedCoverLetter } = useCoverLetterStore();

  if (!coverLetters?.length) {
    return (
      <Cotainer>
        <S.emptyStateContainer>
          <S.emptyStateIcon>
            <GoFile />
          </S.emptyStateIcon>
          <S.emptyStateMessage>작성된 자소설이 없습니다.</S.emptyStateMessage>
          <S.emptyStateSubMessage>
            당신의 이야기를 작성해보세요
          </S.emptyStateSubMessage>
        </S.emptyStateContainer>
      </Cotainer>
    );
  }

  return (
    <Cotainer>
      <ListHeader>
        <ListTitle>차례</ListTitle>
      </ListHeader>
      <Divider />
      <ListContent>
        {coverLetters?.map((item) => (
          <CoverLetterItem
            key={item.essayId}
            item={item}
            selectedCoverLetter={selectedCoverLetter}
            onDelete={removeCoverLetter}
          />
        ))}
      </ListContent>
    </Cotainer>
  );
}

export default CoverLetterList;

const Cotainer = styled(S.baseContainer)`
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-left: 1.5rem solid ${(props) => props.theme.colors.signatureColor};
  box-shadow: ${V.boxShadow1};

  @media screen and (max-width: ${V.mediaMobile}) {
  }
`;

const ListHeader = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  margin-bottom: 2rem;
  padding: 1.2rem 1.6rem;
`;

const ListTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
`;

const Divider = styled.div`
  margin: 0 auto;
  width: calc(100% - 1rem);
  background-color: ${(props) => props.theme.colors.mainLine};
  height: 1px;
`;

const ListContent = styled.ul`
  ${styleMixin.Column('flex-start', 'flex-start')}
  ${styleMixin.ScrollBar}
  width: 100%;
  height: 100%;
  padding: 0.8rem;
  gap: 0.4rem;

  overflow-x:auto;
  ${styleMixin.hideScrollbarStyle};
`;
