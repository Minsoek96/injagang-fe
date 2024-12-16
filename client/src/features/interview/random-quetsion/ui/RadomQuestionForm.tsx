import styled from 'styled-components';

import { useForm } from 'react-hook-form';

import { InputField, MainButton } from '@/src/shared/ui';
import { keys } from '@/src/shared/utils';
import { RandomQuestionType } from '@/src/features/interview/random-quetsion/model/type';

type Props = {
    labels: {
        key: string;
        label: string;
        type: string;
    }[]
    onSubmit : (data: RandomQuestionType) => void;
}

function RadomQuestionForm({ labels, onSubmit }: Props) {
  const { register, handleSubmit } = useForm<RandomQuestionType>({
    defaultValues: {
      CS: 0,
      SITUATION: 0,
      JOB: 0,
      PERSONALITY: 0,
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {labels.map((field, index) => (
        <div key={keys(field.key, index)}>
          <InputField
            label={field.label}
            type={field.type}
            {...register(field.key as keyof RandomQuestionType)}
          />
        </div>
      ))}
      <MainButton
        type="submit"
        label="질문 불러오기"
        sx={{ backgroundColor: '#ff8800', fontSize: '1.8rem', marginTop: '3rem' }}
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
`;
