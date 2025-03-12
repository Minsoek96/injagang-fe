import { Fragment } from 'react';

import styled from 'styled-components';

import { useForm } from 'react-hook-form';

import { RandomQuestionType } from '@/src/features/interview/random-quetsion/model/type';

import { InputField, MainButton } from '@/src/shared/ui';
import { keys } from '@/src/shared/utils';

type Props = {
  labels: {
    key: string;
    label: string;
    type: string;
  }[];
  onSubmit: (data: RandomQuestionType) => void;
};

function RadomQuestionForm({ labels, onSubmit }: Props) {
  const {
    register, handleSubmit, formState: { errors }, setError, clearErrors,
  } = useForm<RandomQuestionType>({
    defaultValues: {
      CS: 0,
      SITUATION: 0,
      JOB: 0,
      PERSONALITY: 0,
    },
  });

  const handleFormSubmit = (data: RandomQuestionType) => {
    const totalQuestions = Object.values(data).reduce((acc, cur) => acc + (cur || 0), 0);

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

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormDescription>각 항목별 필요한 질문 개수를 입력해주세요. (최소 하나 이상)</FormDescription>

      {errors.root && (
        <ErrorMessage>{errors.root.message}</ErrorMessage>
      )}
      {labels.map((field, index) => (
        <Fragment key={keys(field.key, index)}>
          <InputField
            label={field.label}
            type={field.type}
            {...register(field.key as keyof RandomQuestionType)}
          />
        </Fragment>
      ))}
      <MainButton
        type="submit"
        label="질문 불러오기"
        variant="signature"
        sx={{ fontSize: '1.8rem', marginTop: '1rem' }}
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
    color: ${(prop) => prop.theme.colors.text}
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
