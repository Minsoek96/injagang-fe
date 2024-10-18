import { styled } from 'styled-components';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputField, MainButton } from '@/src/shared/ui';
import { authSchema, authType } from '@/src/entities/auth';
import { keys } from '@/src/shared/utils';
import { V } from '@/src/shared/styles';

type FormType = {
  key: string;
  label: string;
  type: string;
};

type Props = {
  onSubmit: (data: authType.ISignup) => void;
  labels: FormType[];
};

/**
 * SignUpForm 회원가입 입력 폼
 *
 * @param onSubmit -  회원가입 처리를 위한 submit
 * @param label - 회원가입 필드 상태
 */
export default function SignUpForm({ onSubmit, labels }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authType.ISignup>({
    resolver: zodResolver(authSchema.signup),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {labels.map((field, index) => (
        <div key={keys(field.key, index)}>
          <InputField
            label={field.label}
            type={field.type}
            {...register(field.key as keyof authType.ISignup)}
          />
          {errors && (
            <ERROR>
              {errors[field.key as keyof authType.ISignup]?.message || ''}
            </ERROR>
          )}
        </div>
      ))}
      <MainButton
        type="submit"
        label="회원가입"
        sx={{ backgroundColor: '#2ecc71', height: '4rem' }}
      />
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 40rem;
  padding: 2rem;
  border-radius: 0.8rem;
  background-color: #15202b;

  @media screen and (max-width: ${V.mediaMobile}) {
    width: 30rem;
  }
`;

const ERROR = styled.div`
  color: red;
  margin-bottom: 1rem;
`;
