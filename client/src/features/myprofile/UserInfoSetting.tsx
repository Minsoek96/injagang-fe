import { useState } from 'react';

import { useAuthStore } from '@/src/entities/auth';
import { InputField, MainButton } from '@/src/shared/ui';

import { S } from '@/src/features/myprofile/common';
import useMyProfileManager from './hooks/useMyProfileManager';

function UserInfoSetting() {
  const { nickName: confirmNick } = useAuthStore();
  const [nickName, setNickName] = useState(confirmNick ?? '');
  const { dispatchNickNameChange } = useMyProfileManager();
  const mainTitle = '닉네임 변경';

  const changeNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNickName(value);
  };

  return (
    <S.MainContainer $size={{ height: '100%', width: '100%', flex: 'Col' }}>
      <S.MainTitle>{mainTitle}</S.MainTitle>
      <InputField
        label="닉네임"
        type="text"
        name="changeNickname"
        value={nickName}
        onChange={changeNickName}
        id="changeNickname"
      />
      <MainButton
        label="변경"
        onClick={() => dispatchNickNameChange(nickName)}
        sx={{ width: '100%', height: '4rem' }}
      />
    </S.MainContainer>
  );
}

export default UserInfoSetting;
