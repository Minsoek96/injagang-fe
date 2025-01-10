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
            <ErrorMessage>
              {errors[field.key as keyof authType.ISignup]?.message || ''}
            </ErrorMessage>
          )}
        </div>
      ))}
      <MainButton
        type="submit"
        label="회원가입"
        variant="signature"
      />
    </Form>
  );
}

const Form = styled.form`
  width: 40rem;
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 1rem;

  button {
    width: 100%;
    height: 3.5rem;
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    width: 35rem;
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.brandColor};
  font-size: 1.2rem;
  margin-block: 1rem;
  padding-left: 0.25rem;
`;
