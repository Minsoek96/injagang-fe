import styled from 'styled-components';

import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { MainButton } from '@/src/shared/ui';
import { keys } from '@/src/shared/utils';

import { RandomQuestionType } from '../model/type';
import ControllerInputField from './ControllerInputField';

type Props = {
  labels: {
    key: string;
    label: string;
    type: string;
  }[];
  isLimitReached: boolean;
  onSubmit: (data: RandomQuestionType) => void;
};

function RadomQuestionForm({ labels, onSubmit, isLimitReached }: Props) {
  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    control,
  } = useForm<RandomQuestionType>({
    defaultValues: {
      CS: 0,
      FRONT: 0,
      BACK: 0,
      SITUATION: 0,
      COMMON: 0,
    },
  });

  const watchedFormValues = useWatch({ control });

  const isTotalZero = useMemo(() => {
    const totalQuestions = Object.values(watchedFormValues).reduce(
      (acc, cur) => acc + (Number(cur) || 0),
      0,
    );
    return totalQuestions === 0;
  }, [watchedFormValues]);

  const handleFormSubmit = (data: RandomQuestionType) => {
    const totalQuestions = Object.values(data).reduce(
      (acc, cur) => acc + (Number(cur) || 0),
      0,
    );

    if (totalQuestions === 0) {
      setError('root', {
        type: 'custom',
        message: '최소 하나 이상의 질문을 선택해주세요.',
      });
      return;
    }
    clearErrors('root');
    onSubmit(data);
  };

  const formDescriptionText = useMemo(() => {
    if (isTotalZero) {
      return '각 항목별로 원하는 질문 수를 선택해주세요 (최소 1개 이상)';
    }

    if (isLimitReached) {
      return '랜덤 질문 추가는 최대 2회까지만 가능합니다';
    }

    return '랜덤 질문 추가 버튼을 클릭하면 선택한 유형의 질문이 생성됩니다';
  }, [isTotalZero, isLimitReached]);

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormDescription>
        {formDescriptionText}
      </FormDescription>

      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

      {labels.map((field, index) => (
        <ControllerInputField
          key={keys(field.key, index)}
          name={field.key as keyof RandomQuestionType}
          label={field.label}
          type={field.type}
          control={control}
        />
      ))}

      <MainButton
        type="submit"
        label="랜덤 질문 추가"
        variant="signature"
        sx={{ fontSize: '1.8rem', marginTop: '1rem' }}
        disabled={isTotalZero || isLimitReached}
      />
    </Form>
  );
}

export default RadomQuestionForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 70rem;
  padding: 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 4px 8px rgba(14, 13, 13, 0.2);

  label {
    color: ${(prop) => prop.theme.colors.text};
  }
`;

const FormDescription = styled.p`
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.red};
  margin-bottom: 1rem;
  font-size: 1.4rem;
  text-align: center;
  font-weight: 500;
`;
