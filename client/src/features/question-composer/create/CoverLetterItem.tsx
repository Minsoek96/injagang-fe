import { S } from '@/src/entities/qnaboard';

type CoverLetterDetailItemsProps = {
  answer: string;
  question: string;
};

/**
 * CoverLetterItem 유저가 선택한 자소서 목록 아이템
 * - 유저가 선택한 자소서 아이템
 * @param question : 자소서 질문
 * @param answer : 자소서 답변
 */
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
