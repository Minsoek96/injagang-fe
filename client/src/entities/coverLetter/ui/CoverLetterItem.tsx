import { styled } from 'styled-components';
import {
  Control,
  Path,
  PathValue,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';
import { BiX } from 'react-icons/bi';

import { coverLetterType } from '@/src/entities/coverLetter';
import { HideSvg } from '@/src/shared/ui';
import { UnResizeableTextarea } from '@/src/shared/ui/uncontrolled';
import { styleMixin, V } from '@/src/shared/styles';

type Props<T extends coverLetterType.IWriteCoverLetter> = {
  register: UseFormRegister<T>;
  control: Control<T>;
  index: number;
  remove: (index: number) => void;
};

export default function CoverLetterItem<
  T extends coverLetterType.IWriteCoverLetter
>({
  index, register, remove, control,
}: Props<T>) {
  const watchedValue = useWatch({
    control,
    name: `qnaList.${index}.answer` as Path<T>,
    defaultValue: '' as PathValue<T, Path<T>>,
  }) as string;

  return (
    <Container>
      <HeaderWrapper>
        <QuestionNumber>{index + 1}</QuestionNumber>
        <HideSvg
          label="삭제"
          Logo={<BiX />}
          onClick={() => remove(index)}
          sx={{
            position: 'absolute',
            top: 2,
            right: 2,
            fontSize: '3rem',
          }}
        />
      </HeaderWrapper>

      <FormGroup>
        <FormLabel>질문</FormLabel>
        <UnResizeableTextarea
          register={register(`qnaList.${index}.question` as Path<T>)}
          placeholder="질문을 입력해주세요."
          maxSize={10}
          minSize={5.5}
          style={{ resize: 'vertical' }}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>답변</FormLabel>
        <UnResizeableTextarea
          register={register(`qnaList.${index}.answer` as Path<T>)}
          placeholder="답변을 입력해주세요."
          maxSize={80}
          minSize={15}
          style={{ resize: 'vertical' }}
        />
        <LenCount $isShort={watchedValue.length < 30}>
          {watchedValue.length}
          /500자
          {watchedValue.length < 30 && (
            <RequiredNote>(최소 30자 이상 입력)</RequiredNote>
          )}
        </LenCount>
      </FormGroup>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 2.4rem 2rem;
  margin: 2rem 0;
  background: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  border-radius: 16px;
  border-left: 4px solid ${(props) => props.theme.colors.signatureColor};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:has(textarea:focus) {
    border-color: ${(props) => props.theme.colors.signatureColor};
    box-shadow: 0 0 0 0.5rem ${(props) => props.theme.colors.signatureColor}40;
  }

  textarea {
    &:focus {
      border-color: ${(props) => props.theme.colors.signatureColor};
    }
  }
`;

const HeaderWrapper = styled.div`
  ${styleMixin.Flex('space-between')}
  margin-bottom: 1.5rem;
`;

const QuestionNumber = styled.span`
  position: absolute;
  top: 1.5rem;
  left: -1.7rem;
  ${styleMixin.Flex()}
  width: 3rem;
  height: 3rem;
  color: white;
  background-color: ${(props) => props.theme.colors.signatureColor};
  font-weight: 600;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const FormLabel = styled.div`
  font-family: ${V.serif};
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 0.8rem;
  color: ${(props) => props.theme.colors.signatureColor};
`;

const LenCount = styled.div<{ $isShort: boolean }>`
  ${styleMixin.Flex('flex-end', 'center')};
  font-size: 1.2rem;
  color: ${(props) =>
    (props.$isShort ? props.theme.colors.red : props.theme.colors.text)};
  margin-top: 0.5rem;
`;

const RequiredNote = styled.span`
  margin-left: 0.5rem;
  font-style: italic;
  font-size: 1.4rem;
`;
