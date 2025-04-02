import { styled } from 'styled-components';

import { interviewType } from '@/src/entities/interview_question';
import { styleMixin, V } from '@/src/shared/styles';
import FeedbackResult from './FeedbackResult';

type ContentProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: ContentProps) {
  return (
    <ContentSection>
      <SectionHeader>
        <Label>{title}</Label>
        <Divider />
      </SectionHeader>
      {children}
    </ContentSection>
  );
}

type Props = {
  question: string;
  recordContents: interviewType.RecordContent;
};

/**
 * 유저의 녹화 정보 상세 결과
*
 * @param question - 녹화 질문
 * @param recordContent - 유저가 입력한 자료들
 */
export default function RecordingDetails({ question, recordContents }: Props) {
  const {
    script,
    voiceScript,
    timer,
    strengths = null,
    improvements = null,
    rating = null,
  } = recordContents;

  return (
    <Wrapper>
      <TimerSection>
        <Label>녹화 시간</Label>
        <Timer>{timer || '00:00'}</Timer>
      </TimerSection>

      <Section title="인터뷰 질문">
        <Content>{question}</Content>
      </Section>

      <Section title="스크립트">
        <ContentCard>{script || '작성한 대본이 없습니다.'}</ContentCard>
      </Section>

      <Section title="음성 스크립트">
        <ContentCard>
          {voiceScript || '발음 인식이 진행되지 않았습니다.'}
        </ContentCard>
      </Section>

      <FeedbackSection>
        <SectionHeader>
          <Label>피드백 요청 결과</Label>
          <Divider />
        </SectionHeader>
        <FeedbackResult strengths={strengths} improvements={improvements} rating={rating} />
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
  font-family: "Roboto Mono", monospace;

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;

const FeedbackSection = styled(ContentSection)`
  width: 100%;
  margin-top: 0.8rem;
  padding-top: 1.2rem;
`;
