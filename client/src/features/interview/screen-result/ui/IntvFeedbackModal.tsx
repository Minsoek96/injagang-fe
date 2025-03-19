import { useState } from 'react';

import styled from 'styled-components';

import { interviewMutation } from '@/src/entities/interview_question';

import { MainButton, Modal } from '@/src/shared/ui';
import { styleMixin } from '@/src/shared/styles';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  question?: string;
  voiceScript?: string;
  script?: string;
  counter: number;
};

/**
 * TODO : screen-result 에서 기능 분리?
 * FSD 원칙 고려
 * 기능 분리 생각하기
 * mutation 결과 값 처리 방법 생각하기
 *  */

export default function IntvFeedbackModal({
  isOpen,
  onClose,
  question = '',
  voiceScript = '',
  script = '',
  counter,
}: Props) {
  const { mutateAsync: requestFeedback, isPending } = interviewMutation.useGetIntvFeedback();

  const [selectedSource, setSelectedSource] = useState<'voice' | 'script'>(
    'voice',
  );
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleRequestFeedback = async () => {
    const qnaPayload = {
      question,
      answer: selectedSource === 'voice' ? voiceScript : script,
      counter,
    };
    const isPayloadValid = qnaPayload.question.trim() && qnaPayload.answer.trim();

    if (!isPayloadValid) {
      setErrorMsg('질문와 답변이 비어있는 경우 피드백을 요청할 수 없습니다.');
      return;
    }

    try {
      await requestFeedback(qnaPayload);
      onClose();
    } catch (error) {
      setErrorMsg('피드백 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

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
            <RadioGroup>
              <RadioOption>
                <input
                  type="radio"
                  id="voice-script"
                  name="analysis-source"
                  checked={selectedSource === 'voice'}
                  onChange={() => setSelectedSource('voice')}
                />
                <label htmlFor="voice-script">음성 스크립트 기반 분석</label>
              </RadioOption>
              <RadioOption>
                <input
                  type="radio"
                  id="written-script"
                  name="analysis-source"
                  checked={selectedSource === 'script'}
                  onChange={() => setSelectedSource('script')}
                />
                <label htmlFor="written-script">
                  작성한 스크립트 기반 분석
                </label>
              </RadioOption>
            </RadioGroup>
          </Section>

          <Section>
            <SectionTitle>질문</SectionTitle>
            <TextBox>{question}</TextBox>
          </Section>

          <Section>
            <SectionTitle>응답 내용 (선택한 소스)</SectionTitle>
            <TextBox>
              {selectedSource === 'voice' ? voiceScript : script}
            </TextBox>
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

const RadioGroup = styled.div`
  ${styleMixin.Column('', 'flex-start')}
  gap: 1rem;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  input[type="radio"] {
    width: 2rem;
    height: 2rem;
  }

  label {
    font-size: 1.6rem;
  }
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
