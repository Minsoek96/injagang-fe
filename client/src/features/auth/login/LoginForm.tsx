import { useEffect, useState } from 'react';

import { css, styled } from 'styled-components';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { shakeAnimation } from '@/src/shared/styles';
import { InputField, MainButton } from '@/src/shared/ui';
import { authSchema, authType } from '@/src/entities/auth';
import { getFirstErrorMessage, keys } from '@/src/shared/utils';

type FormType = {
  key: string;
  label: string;
  type: string;
};

type Props = {
  onSubmit: (data: authType.ISignin) => void;
  navigateToSignUp: () => void;
  labels: FormType[];
};

export default function LoginForm({
  onSubmit,
  labels,
  navigateToSignUp,
}: Props) {
  const [shakeTrigger, setShakeTrigger] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authType.ISignin>({
    resolver: zodResolver(authSchema.signin),
  });

  useEffect(() => {
    if (getFirstErrorMessage(errors)) {
      setShakeTrigger(false);
      setTimeout(() => {
        setShakeTrigger(true);
      }, 50);
    }
  }, [errors]);

  return (
    <Form $shakeTrigger={shakeTrigger} onSubmit={handleSubmit(onSubmit)}>
      {labels.map((field, index) => (
        <div key={keys(field.key, index)}>
          <InputField
            label={field.label}
            type={field.type}
            {...register(field.key as keyof authType.ISignin)}
          />
          {errors && (
            <ERROR>
              {errors[field.key as keyof authType.ISignin]?.message || ''}
            </ERROR>
          )}
        </div>
      ))}
      <MainButton type="submit" label="로그인" sx={{ marginBottom: '.5rem' }} />
      <MainButton onClick={navigateToSignUp} label="회원가입" />
    </Form>
  );
}

const Form = styled.form<{ $shakeTrigger: boolean }>`
  display: flex;
  flex-direction: column;
  width: 30rem;
  padding: 2rem;
  border-radius: 0.8rem;
  background-color: #15202b;
  ${({ $shakeTrigger }) =>
    $shakeTrigger
    && css`
      animation: ${shakeAnimation} 0.5s;
    `}

  button {
    height: 4rem;
    background-color: #2ecc71;
  }
`;

const ERROR = styled.div`
  color: red;
  margin-bottom: 1rem;
`;
