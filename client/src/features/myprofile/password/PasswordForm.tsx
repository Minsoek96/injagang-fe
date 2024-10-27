import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { S, authSchema, authType } from '@/src/entities/auth';

import { InputField, MainButton } from '@/src/shared/ui';
import { getFirstErrorMessage } from '@/src/shared/utils';

type Props = {
  onSubmit: (data: authType.IChangePw) => void;
  labels: authType.IChangePw;
};
export default function PasswordForm({ onSubmit, labels }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authType.IChangePw>({
    resolver: zodResolver(authSchema.password),
  });

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(labels).map((key) => (
        <InputField
          key={key}
          label={labels[key as keyof authType.IChangePw]}
          type="password"
          {...register(key as keyof authType.IChangePw)}
        />
      ))}
      {errors && (
        <S.Warring>{getFirstErrorMessage(errors)}</S.Warring>
      )}
      <MainButton
        label="변경"
        type="submit"
        sx={{ width: '100%', height: '4rem' }}
      />
    </S.Form>
  );
}
