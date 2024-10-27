import { memo } from 'react';

import { coverLetterQueries, S } from '@/src/entities/coverLetter';

import CoverLetterItem from './CoverLetterItem';

interface CoverLetterProps {
  essayId: number;
}

/**
 * CoverLetterDetail
 * - 유저가 선택한 자소서 상세 리스트
 * @param essayId : 선택된 자소서 아이디
 */
function CoverLetterDetail({ essayId }: CoverLetterProps) {
  const { data: coverLetterDetail } = coverLetterQueries.useFetchDetailCoverLetter(essayId);

  if (essayId === 0) {
    return (
      <div>
        <p>선택된 값이 없습니다.</p>
        <p>새로운 자소서를 첨부해주세요..</p>
      </div>
    );
  }
  return (
    <S.container>
      {coverLetterDetail && (
        <>
          <S.mainTitle>{coverLetterDetail.title}</S.mainTitle>
          {coverLetterDetail.qnaList.map((qna) => (
            <CoverLetterItem key={qna.qnaId} {...qna} />
          ))}
        </>
      )}
    </S.container>
  );
}

export default memo(CoverLetterDetail);
