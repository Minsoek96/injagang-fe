import { styled } from 'styled-components';

import {
  coverLetterQueries,
  PreviewStyle as S,
} from '@/src/entities/coverLetter';

import { styleMixin, V } from '@/src/shared/styles';

import CoverLetterContent from './CoverLetterContent';
import CoverLetterHeader from './CoverLetterHeader';

type Props = {
  essayId: number;
};

export default function CoverLetterDetail({ essayId }: Props) {
  const { data: coverLetterData } = coverLetterQueries.useFetchDetailCoverLetter(essayId);
  const { qnaList } = coverLetterData;
  return (
    <CoverLetterContainer>
      <HeaderWrapper>
        <CoverLetterHeader
          title={coverLetterData.title}
          questionLen={qnaList.length}
        />
      </HeaderWrapper>
      <ContentWrapper>
        {qnaList.map((item, index) => (
          <CoverLetterContent key={item.qnaId} index={index} {...item} />
        ))}
      </ContentWrapper>
    </CoverLetterContainer>
  );
}

const CoverLetterContainer = styled(S.baseContainer)`
  box-shadow: ${V.boxShadow2};
  overflow-y: auto;
  ${styleMixin.ScrollBar};
  padding-left: 2rem;
`;

const HeaderWrapper = styled.div`
  padding: 2rem 2rem 1.5rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.mainLine};
  margin-bottom: 2rem;
`;

const ContentWrapper = styled.div`
  ${styleMixin.Column('flex-start', 'flex-start')}
  padding: 0 2rem 3rem 0;
  gap: 3rem;
`;
