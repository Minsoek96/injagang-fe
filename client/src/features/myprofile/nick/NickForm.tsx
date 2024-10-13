import { useForm } from 'react-hook-form';

import { useAuthStore, S } from '@/src/entities/auth';

import { InputField, MainButton } from '@/src/shared/ui';

type Props = {
    onSubmit : (data: { nickName: string }) => void;
}
function NickForm({ onSubmit }:Props) {
  const { nickName: confirmNick } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nickName: confirmNick ?? '',
    },
  });

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="닉네임"
        type="text"
        id="changeNickname"
        {...register('nickName', { required: '닉네임을 입력해주세요.' })}
      />
      {errors.nickName && <S.Warring>{errors.nickName.message}</S.Warring>}
      <MainButton
        label="변경"
        type="submit"
        sx={{ width: '100%', height: '4rem' }}
      />
    </S.Form>
  );
}

export default NickForm;
