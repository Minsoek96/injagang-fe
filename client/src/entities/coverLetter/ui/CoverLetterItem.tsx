import { styled } from 'styled-components';

import {
  Control, Path, PathValue, UseFormRegister, useWatch,
} from 'react-hook-form';

import { BiX } from 'react-icons/bi';

import { coverLetterType } from '@/src/entities/coverLetter';

import { HideSvg } from '@/src/shared/ui';
import { UnResizeableTextarea } from '@/src/shared/ui/uncontrolled';

type Props<T extends coverLetterType.IWriteCoverLetter> = {
  register: UseFormRegister<T>;
  control: Control<T>;
  index: number;
  remove: (index: number) => void;
};

/**
 * CoverLetterItem는 자기소개서 항목을 생성하는 UI를 구성합니다.
 *
 * 이 컴포넌트는 다음 기능을 제공합니다:
 * - 질문과 답변을 입력하는 텍스트 영역
 * - 질문 및 답변의 글자 수 표시
 * - 항목 삭제 기능
 *
 * @param index - 현재 항목의 인덱스
 * @param register - react-hook-form의 register 함수
 * @param control - react-hook-form의 control 객체
 * @param remove - 항목을 삭제하는 함수
 */

export default function CoverLetterItem<T extends coverLetterType.IWriteCoverLetter>({
  index,
  register,
  remove,
  control,
}: Props<T>) {
  const watchedValue = useWatch({
    control,
    name: `qnaList.${index}.answer` as Path<T>,
    defaultValue: '' as PathValue<T, Path<T>>,
  }) as string;

  return (
    <ItemsContainer>
      <HideSvg
        label="삭제"
        Logo={<BiX />}
        onClick={() => remove(index)}
        sx={{
          position: 'absolute',
          right: 1,
          top: 1,
          fontSize: '2em',
        }}
      />
      <UnResizeableTextarea
        register={register(`qnaList.${index}.question` as Path<T>)}
        placeholder="질문을 작성해주세요."
        maxSize={10}
        style={{ resize: 'vertical', minHeight: '5.5rem' }}
      />
      <UnResizeableTextarea
        register={register(`qnaList.${index}.answer` as Path<T>)}
        placeholder="답변을 작성해주세요."
        maxSize={30}
        style={{ minHeight: '15rem', resize: 'vertical' }}
      />
      {`글자수 : ${watchedValue.length}/500`}
    </ItemsContainer>
  );
}

const ItemsContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 2.5rem 1.8rem;
  margin: 2rem 0;
  background: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  border-radius: 16px;
  transition: all 0.2s ease;
  &:has(textarea:focus) {
    border-color: ${(props) => props.theme.colors.signatureColor};
  }

  textarea:focus {
    color: ${(props) => props.theme.colors.dark};
    background-color: ${(props) => props.theme.colors.highlightColor};
  }
`;
