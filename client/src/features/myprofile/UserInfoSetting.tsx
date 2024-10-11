import { useForm } from 'react-hook-form';

import { useAuthStore } from '@/src/entities/auth';

import { InputField, MainButton } from '@/src/shared/ui';

import { S } from '@/src/features/myprofile/common';

import useMyProfileManager from './hooks/useMyProfileManager';

function UserInfoSetting() {
  const { nickName: confirmNick } = useAuthStore();
  const { dispatchNickNameChange } = useMyProfileManager();
  const mainTitle = '닉네임 변경';

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nickName: confirmNick ?? '',
    },
  });

  // 닉네임 변경 처리 함수
  const onSubmit = (data: { nickName: string }) => {
    dispatchNickNameChange(data.nickName);
  };

  return (
    <S.MainContainer $size={{ height: '100%', width: '100%', flex: 'Col' }}>
      <S.MainTitle>{mainTitle}</S.MainTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="닉네임"
          type="text"
          id="changeNickname"
          {...register('nickName', { required: '닉네임을 입력해주세요.' })}
        />
        {errors.nickName && <p>{errors.nickName.message}</p>}
        <MainButton
          label="변경"
          type="submit"
          sx={{ width: '100%', height: '4rem' }}
        />
      </form>
    </S.MainContainer>
  );
}

export default UserInfoSetting;
