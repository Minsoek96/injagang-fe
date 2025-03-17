import { styled } from 'styled-components';
import { styleMixin, V } from '@/src/shared/styles';

type Props = {
 question: string;
 script: string;
 voiceScript: string;
 timer: string;
};

export default function RecordingDetails({
  question, script, timer, voiceScript,
}: Props) {
  return (
    <Wrapper>
      <ContentSection>
        <Label>인터뷰 질문</Label>
        <Content>{question}</Content>
      </ContentSection>

      <ContentSection>
        <Label>스크립트</Label>
        <Content>{script}</Content>
      </ContentSection>

      <ContentSection>
        <Label>음성 스크립트</Label>
        <Content>{voiceScript}</Content>
      </ContentSection>

      <TimerSection>
        <Label>녹화 시간</Label>
        <Timer>{timer}</Timer>
      </TimerSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
${styleMixin.Column('', 'flex-start')}
 width: 100%;
 gap: 1rem;
 padding: 2rem;
 background-color: ${(props) => props.theme.colors.primary};
 border-radius: 1.2rem;

 @media screen and (max-width: ${V.mediaMobile}) {
   padding: 1.25rem;
 }
`;

const ContentSection = styled.div`
 display: flex;
 flex-direction: column;
 gap: 0.2rem;
`;

const Label = styled.span`
 font-size: 1.6rem;
 font-weight: 600;
 color: ${(props) => props.theme.colors.signatureColor};

 @media screen and (max-width: ${V.mediaMobile}) {
   font-size: 1.4rem;
 }
`;

const Content = styled.p`
 font-size: 1.8rem;
 line-height: 1.6;
 color: ${(props) => props.theme.colors.text};

 @media screen and (max-width: ${V.mediaMobile}) {
   font-size: 1.4rem;
 }
`;

const TimerSection = styled.div`
 ${styleMixin.Flex('flex-start')}
 width: 100%;
 gap: 1rem;
 padding-top: 1rem;
 border-top: 1px solid ${(props) => props.theme.colors.mainLine};
`;

const Timer = styled.p`
 font-size: 1.8rem;
 font-weight: 500;
 color: ${(props) => props.theme.colors.text};

 @media screen and (max-width: ${V.mediaMobile}) {
   font-size: 1.4rem;
 }
`;
