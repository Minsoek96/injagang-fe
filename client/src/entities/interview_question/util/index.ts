import {
  QuestionType,
  QuestionTypeKrValue,
  QuestionTypeValue,
} from '../model/type';

/**
 * 한글 질문 유형 라벨을 영어 타입 값으로 변환하는 함수.
 *
 * 프론트에서 한글라벨 백엔드 통신에 필요한 영어 타입 변환
 */
export const getQuestionTypeByLabel = (label: QuestionTypeKrValue): QuestionTypeValue => {
  const mapping: Record<QuestionTypeKrValue, QuestionTypeValue> = {
    'CS 질문': QuestionType.CS,
    '상황 질문': QuestionType.SITUATION,
    '프론트엔드 질문': QuestionType.FRONT,
    '백엔드 질문': QuestionType.BACK,
    '공통 질문': QuestionType.COMMON,
    '대학 입학 질문': QuestionType.UNIVERSITY,
    '전체 유형': QuestionType.ALL,
  };

  return mapping[label];
};
