import { memo } from 'react';

import styled from 'styled-components';

import { MainButton } from '@/src/shared/ui/button';
import { styleMixin, V } from '@/src/shared/styles';

import usePagiNation from './model/usePagination';

type Props = {
  pageLimit: number;
  totalPage: number;
}
/** 페이지 네이션 버튼을 렌더하는 함수 */
function PageNavigator({ pageLimit, totalPage }:Props) {
  const {
    curPageNum,
    handlePageSelect,
    handlePrvePage,
    handleNextPage,
    visiblePageNumbers,
    hasNext,
    hasPrev,
  } = usePagiNation(pageLimit, totalPage);

  return (
    <Container>
      <MainButton label="<" onClick={handlePrvePage} disabled={!hasPrev} />
      <PageButtonContainer>
        {visiblePageNumbers.map((pageNum) => (
          <MainButton
            key={pageNum}
            label={pageNum}
            isActive={pageNum === curPageNum}
            onClick={() => handlePageSelect(pageNum)}
            sx={{ marginInline: '.2rem' }}
          />
        ))}
      </PageButtonContainer>
      <MainButton label=">" onClick={handleNextPage} disabled={!hasNext} />
    </Container>
  );
}

export default memo(PageNavigator);

const Container = styled.div`
 ${styleMixin.Flex()}

 button {
  font-size: 1.8rem;
 }

 @media screen and (max-width: ${V.mediaMobile}){
  ${styleMixin.Flex('space-between')}
  width: 100%;
 }
`;

const PageButtonContainer = styled.div`
 ${styleMixin.Flex()}

 @media screen and (max-width: ${V.mediaMobile}){
    display:none;
 }
`;
