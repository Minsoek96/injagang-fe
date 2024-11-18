import { styled } from 'styled-components';

import { V } from '@/src/shared/styles';

type Props = {
  question: string;
  script: string;
  timer: string;
};
export default function VideoInfos({ question, script, timer }: Props) {
  return (
    <RecordInfo>
      <p>
        <span>인터뷰 질문 : </span>
        {question}
      </p>
      <p>
        <span>스크립트 : </span>
        {script}
      </p>
      <p>
        <span>녹화 시간 : </span>
        {timer}
      </p>
    </RecordInfo>
  );
}

const RecordInfo = styled.div`
  font-size: 1.8rem;
  span {
    color: ${(props) => props.theme.colors.signatureColor};
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;
  }
`;
