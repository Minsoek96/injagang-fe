import { styled } from 'styled-components';

type Props = {
  explanationList: string[];
};

export default function ExplanationContent({ explanationList }: Props) {
  return (
    <Explanation>
      {explanationList.map((content, index) => (
        <div key={content}>
          {index === 0 ? (
            <h1>
              [
              {content}
              ]
            </h1>
          ) : <p>{content}</p>}
        </div>
      ))}
    </Explanation>
  );
}

const Explanation = styled.div`
  margin: 3rem;
  line-height: 2;

  h1 {
    font-size: 2rem;
  }
`;
