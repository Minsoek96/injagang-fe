import { useFetchDetailCoverLetter } from '@/src/entities/coverLetter/queries';
import { memo } from 'react';
import { S } from '@/src/features/qna/common';
import CoverLetterItem from './CoverLetterItem';

interface CoverLetterProps {
  essayId: number;
}

function CoverLetterDetail({ essayId }: CoverLetterProps) {
  const { data: coverLetterDetail } = useFetchDetailCoverLetter(essayId);

  if (essayId === 0) {
    return (
      <div>
        <p>선택된 값이 없습니다.</p>
        <p>새로운 자소서를 첨부해주세요 ..</p>
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
