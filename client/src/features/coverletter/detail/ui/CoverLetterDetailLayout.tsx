import styled from 'styled-components';
import { PiBookLight } from 'react-icons/pi';

import {
  useCoverLetterStore,
} from '@/src/entities/coverLetter';

import { styleMixin, V } from '@/src/shared/styles';
import { CoverLetterDetail } from './content';

export default function CoverLetterDetailLayout() {
  const selectedCoverLetter = useCoverLetterStore(
    (state) => state.selectedCoverLetter,
  );
  const { essayId } = selectedCoverLetter;

  if (essayId === 0) {
    return (
      <CoverLetterContainer>
        <EmptyStateContainer>
          <EmptyStateIcon><PiBookLight /></EmptyStateIcon>
          <EmptyStateMessage>아직 펼쳐보지 않은 페이지</EmptyStateMessage>
          <EmptyStateSubMessage>
            왼쪽 책갈피에서 당신의 이야기를 선택해 읽어보세요
          </EmptyStateSubMessage>
        </EmptyStateContainer>
      </CoverLetterContainer>
    );
  }

  return <CoverLetterDetail essayId={essayId} />;
}

const EmptyStateContainer = styled.div`
  height: 100%;
  ${styleMixin.Column()}
  padding: 2rem;
  color: ${(props) => props.theme.colors.text};
`;

const EmptyStateIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
  opacity: 0.6;
`;

const EmptyStateMessage = styled.p`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.signatureColor};
`;

const EmptyStateSubMessage = styled.p`
  text-align: center;
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.emptyGray};
`;

const CoverLetterContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  background-color: ${(props) => props.theme.colors.primary};
  box-shadow: ${V.boxShadow2};
  overflow-y: auto;
  ${styleMixin.ScrollBar};
  padding-left: 2rem;
`;
