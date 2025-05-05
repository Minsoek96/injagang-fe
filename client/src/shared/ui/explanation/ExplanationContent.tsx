import { V } from '@/src/shared/styles';
import { styled } from 'styled-components';

type Props = {
  explanationList: string[];
};

export default function ExplanationContent({ explanationList }: Props) {
  return (
    <Explanation>
      {explanationList.map((content, index) => (
        <div key={content}>
          {index === 0 ? <h1>{content}</h1> : <p>{content}</p>}
        </div>
      ))}
    </Explanation>
  );
}

const Explanation = styled.div`
  word-break: keep-all;
  margin-bottom: 3rem;
  line-height: 1.8;

  h1 {
    font-size: 2rem;
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    font-size: 1.4rem;

    h1 {
      font-size: 1.6rem;
    }
  }
`;
