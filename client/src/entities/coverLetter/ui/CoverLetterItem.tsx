import { styled } from 'styled-components';

import {
  Control,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';

import { BiX } from 'react-icons/bi';

import { coverLetterType } from '@/src/entities/coverLetter';

import { styleMixin, V } from '@/src/shared/styles';
import { HideSvg } from '@/src/shared/ui';
import { UnResizeableTextarea } from '@/src/shared/ui/uncontrolled';

type Props = {
  register: UseFormRegister<coverLetterType.ICoverLetter>;
  control: Control<coverLetterType.ICoverLetter>;
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

export default function CoverLetterItem({
  index,
  register,
  remove,
  control,
}: Props) {
  const watchedValue = useWatch({
    control,
    name: `qnaList.${index}.answer`,
    defaultValue: '',
  });

  return (
    <ItemsContainer>
      <HideSvg
        label="삭제"
        Logo={<BiX />}
        onClick={() => remove(index)}
        sx={{
          position: 'absolute',
          right: 2,
          top: 2,
          fontSize: '2em',
        }}
      />
      <UnResizeableTextarea
        register={register(`qnaList.${index}.question`)}
        placeholder="내용을 작성해주세요."
        maxSize={10}
        style={{ resize: 'vertical' }}
      />
      <UnResizeableTextarea
        register={register(`qnaList.${index}.answer`)}
        placeholder="내용을 작성해주세요."
        maxSize={30}
        style={{ minHeight: '15rem', resize: 'vertical' }}
      />
      {`글자수 : ${watchedValue.length}/500`}
    </ItemsContainer>
  );
}

const ItemsContainer = styled.div`
  ${styleMixin.Column()}
  position: relative;
  width: 100%;
  padding: 2.5em 0.8em 1em 0.8em;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  min-height: 25rem;
  border-radius: 8px;
  box-shadow: ${V.boxShadow3};
  margin: 2.5rem auto;
`;
