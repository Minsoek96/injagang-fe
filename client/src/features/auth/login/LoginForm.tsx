import { useEffect, useState } from 'react';

import { css, styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { authSchema, authType } from '@/src/entities/auth';

import { shakeAnimation, styleMixin, V } from '@/src/shared/styles';
import { InputField, MainButton } from '@/src/shared/ui';
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
        <FieldWrapper key={keys(field.key, index)}>
          <InputField
            label={field.label}
            type={field.type}
            {...register(field.key as keyof authType.ISignin)}
          />
          {errors && (
            <ErrorMessage>
              {errors[field.key as keyof authType.ISignin]?.message || ''}
            </ErrorMessage>
          )}
        </FieldWrapper>
      ))}
      <ButtonGroup>
        <MainButton type="submit" label="로그인" variant="signature" />
        <MainButton
          onClick={navigateToSignUp}
          label="회원가입"
          variant="signature"
        />
      </ButtonGroup>
    </Form>
  );
}

const Form = styled.form<{ $shakeTrigger: boolean }>`
  width: 40rem;
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  border-radius: 1rem;

  ${({ $shakeTrigger }) =>
    $shakeTrigger
    && css`
      animation: ${shakeAnimation} 0.5s;
    `}

  @media screen and (max-width: ${V.mediaMobile}) {
    width: 35rem;
  }
`;

const FieldWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.brandColor};
  font-size: 1.2rem;
  margin-top: 0.5rem;
  padding-left: 0.25rem;
`;

const ButtonGroup = styled.div`
  ${styleMixin.Column()};
  gap: 0.75rem;
  margin-top: 1rem;

  button {
    width: 100%;
    height: 3.5rem;
  }
`;
