import { styled } from 'styled-components';
import { styleMixin, V } from '@/src/shared/styles';
import { keys } from '@/src/shared/utils';

type RecordContent = {
  script: string;
  timer: string;
  voiceScript: string;
  strengths: string[];
  improvements: string[];
};

type Props = {
  question: string;
  recordContents: RecordContent;
};

export default function RecordingDetails({ question, recordContents }: Props) {
  const {
    script,
    voiceScript,
    timer,
    strengths = [],
    improvements = [],
  } = recordContents;

  return (
    <Wrapper>
      <TimerSection>
        <Label>녹화 시간</Label>
        <Timer>{timer || '00:00'}</Timer>
      </TimerSection>

      <ContentSection>
        <SectionHeader>
          <Label>인터뷰 질문</Label>
          <Divider />
        </SectionHeader>
        <Content>{question}</Content>
      </ContentSection>

      <ContentSection>
        <SectionHeader>
          <Label>스크립트</Label>
          <Divider />
        </SectionHeader>
        <ContentCard>{script || '작성한 대본이 없습니다.'}</ContentCard>
      </ContentSection>

      <ContentSection>
        <SectionHeader>
          <Label>음성 스크립트</Label>
          <Divider />
        </SectionHeader>
        <ContentCard>{voiceScript || '발음 인식이 진행되지 않았습니다.'}</ContentCard>
      </ContentSection>

      <FeedbackSection>
        <SectionHeader>
          <Label>피드백 요청 결과</Label>
          <Divider />
        </SectionHeader>

        <FeedbackContainer>
          {strengths.length > 0 && (
            <FeedbackWrapper>
              <CategoryLabel>
                강점
              </CategoryLabel>
              {strengths.map((strength, idx) => (
                <FeedbackItem $iconType="strengths" key={keys(strength, idx)}>
                  {strength}
                </FeedbackItem>
              ))}
            </FeedbackWrapper>
          )}

          {improvements.length > 0 && (
            <FeedbackWrapper>
              <CategoryLabel>
                개선점
              </CategoryLabel>
              {improvements.map((improvement, idx) => (
                <FeedbackItem
                  $iconType="improvements"
                  key={keys(improvement, idx)}
                >
                  {improvement}
                </FeedbackItem>
              ))}
            </FeedbackWrapper>
          )}
        </FeedbackContainer>
      </FeedbackSection>

    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${styleMixin.Column('', 'flex-start')}
  width: 100%;
  gap: 1.5rem;
  padding: 2.5rem;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 1.2rem;

  @media screen and (max-width: ${V.mediaMobile}) {
    padding: 1.5rem;
    gap: 1.2rem;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 0.3rem;
`;

const Divider = styled.div`
  flex: 1;
  height: 1px;
  background-color: ${(props) => props.theme.colors.mainLine};
  margin-left: 1rem;
  opacity: 0.6;
`;

const Label = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.signatureColor};
  padding-bottom: 0.2rem;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;

const Content = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  word-break: keep-all;
  color: ${(props) => props.theme.colors.text};
  padding: 0 0.5rem;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;

const ContentCard = styled.div`
  font-size: 1.8rem;
  line-height: 1.6;
  word-break: keep-all;
  color: ${(props) => props.theme.colors.text};
  padding: 1.2rem 1.5rem;
  border-radius: 0.8rem;
  border-left: 3px solid ${(props) => props.theme.colors.signatureColor};

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
    padding: 1rem 1.2rem;
  }
`;

const TimerSection = styled.div`
  ${styleMixin.Flex('flex-start')}
  width: 100%;
  gap: 1rem;
  border-radius: 0.8rem;
  margin-bottom: 0.5rem;
`;

const Timer = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  font-family: 'Roboto Mono', monospace;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;

const FeedbackSection = styled(ContentSection)`
  width: 100%;
  margin-top: 0.8rem;
  padding-top: 1.2rem;
`;

const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const FeedbackWrapper = styled.div`
  margin-top: 0.5rem;
  border-radius: 0.8rem;
  padding: 1.2rem 1.5rem;
`;

const CategoryLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px dashed ${(props) => props.theme.colors.mainLine};

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;

type FeedItemStyle = {
  $iconType: 'improvements' | 'strengths';
};

const FeedbackItem = styled.p<FeedItemStyle>`
  position: relative;
  font-size: 1.7rem;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.text};
  margin: 0.8rem 0;
  padding-left: 1.8rem;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.6rem;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: ${(props) =>
    (props.$iconType === 'strengths' ? 'green' : 'orange')};
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
    padding-left: 1.6rem;

    &::before {
      top: 0.5rem;
      width: 0.7rem;
      height: 0.7rem;
    }
  }
`;
