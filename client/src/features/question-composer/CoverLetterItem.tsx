import { S } from '@/src/features/qna/style';

type CoverLetterDetailItemsProps = {
  answer: string;
  question: string;
};

function CoverLetterItem({ answer, question }: CoverLetterDetailItemsProps) {
  return (
    <S.detailItmes>
      <S.questionContainer>
        <span>질문 : </span>
        <p>{question}</p>
      </S.questionContainer>
      <S.answerContainer>
        <span>답변:</span>
        <p>{answer}</p>
      </S.answerContainer>
    </S.detailItmes>
  );
}

export default CoverLetterItem;
