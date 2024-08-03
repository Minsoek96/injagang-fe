import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';

import { useFetchDetailCoverLetter } from '@/src/entities/coverLetter/queries';
import { memo } from 'react';
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
    <CoverLetterDetailStyle>
      {coverLetterDetail && (
        <CoverLetterContainer>
          <SelectedTtile>{coverLetterDetail.title}</SelectedTtile>
          {coverLetterDetail.qnaList.map((qna) => (
            <CoverLetterItem key={qna.qnaId} {...qna} />
          ))}
        </CoverLetterContainer>
      )}
    </CoverLetterDetailStyle>
  );
}

export default memo(CoverLetterDetail);

const CoverLetterDetailStyle = styled.div`
  ${styleMixin.ScrollBar}
  color: ${(props) => props.theme.text};
  word-break: break-all;
  overflow-x: hidden;
`;
const CoverLetterContainer = styled.div``;

const SelectedTtile = styled.h2`
  color: ${(props) => props.theme.colors.signatureColor};
  font-size: 3rem;
`;
