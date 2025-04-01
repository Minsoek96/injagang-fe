import styled from 'styled-components';

import { interviewType } from '@/src/entities/interview_question';

import { MainButton, Modal, RadioGroup } from '@/src/shared/ui';
import { styleMixin } from '@/src/shared/styles';

import { useIntvFeedback } from '../../model';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  recordContent: interviewType.RecordContent;
  counter: number;
};

export default function IntvFeedbackModal({
  isOpen,
  onClose,
  question,
  recordContent,
  counter,
}: Props) {
  const {
    errorMsg,
    selectedSource,
    changeSelectedSource,
    isPending,
    handleRequestFeedback,
    getSelectedText,
  } = useIntvFeedback({
    recordContent,
    counter,
    onClose,
    question,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <ModalTitle>피드백 분석 검토</ModalTitle>
      </Modal.Header>
      <Modal.Content>
        <ContentContainer>
          <Section>
            <ErrorText>{errorMsg}</ErrorText>
          </Section>
          <Section>
            <SectionTitle>분석 소스 선택</SectionTitle>
            <RadioGroup
              name="analysis-source"
              value={selectedSource}
              onChange={changeSelectedSource}
            >
              <RadioGroup.Option value="voice">
                음성 스크립트 기반 분석
              </RadioGroup.Option>
              <RadioGroup.Option value="script">
                작성한 스크립트 기반 분석
              </RadioGroup.Option>
            </RadioGroup>
          </Section>

          <Section>
            <SectionTitle>질문</SectionTitle>
            <TextBox>{question}</TextBox>
          </Section>

          <Section>
            <SectionTitle>응답 내용 (선택한 소스)</SectionTitle>
            <TextBox>{getSelectedText}</TextBox>
          </Section>

          <InfoText>
            선택한 소스를 기반으로 AI가 면접 답변에 대한 피드백을 생성합니다.
            분석에는 약 10-15초 정도 소요됩니다.
          </InfoText>
        </ContentContainer>
      </Modal.Content>
      <Modal.Actions>
        <ButtonContainer>
          <MainButton label="취소" onClick={onClose} variant="outline" />
          <MainButton
            label={isPending ? '분석 중...' : '피드백 요청'}
            onClick={handleRequestFeedback}
            variant="signature"
            disabled={isPending}
          />
        </ButtonContainer>
      </Modal.Actions>
    </Modal>
  );
}

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: white;
  margin: 0;
`;

const ContentContainer = styled.div`
  ${styleMixin.Column()}
  color: ${(props) => props.theme.colors.dark};
  width: 100%;
  gap: 2rem;
  padding: 1rem 0;
`;

const Section = styled.div`
  width: 100%;
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const TextBox = styled.div`
  width: 100%;
  min-height: 8rem;
  max-height: 15rem;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.highlightColor};
  border-radius: 0.8rem;
  padding: 1.5rem;
  font-size: 1.6rem;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const InfoText = styled.p`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.emptyGray};
  margin-top: 1rem;
  text-align: center;
`;

const ErrorText = styled.p`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.red};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;
