import { useEffect, useState } from 'react';

import { SessionStorageManager } from '@/src/shared/utils';
import { useAuthStore } from '@/src/entities/auth';
import { InputField, MainButton } from '@/src/shared/components';

import { S } from '@/src/features/myprofile/common';
import useMyProfileManager from './hooks/useMyProfileManager';

const myInfo = new SessionStorageManager('info');

function UserInfoSetting() {
  const { nickName: confirmNick } = useAuthStore();
  const [nickName, setNickName] = useState(confirmNick ?? '');
  const { dispatchNickNameChange } = useMyProfileManager();
  const mainTitle = '닉네임 변경';

  useEffect(() => {
    const getMyNick = myInfo.get();
    getMyNick && setNickName(getMyNick.nickname);
  }, []);

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
        onAction={() => dispatchNickNameChange(nickName)}
        sx={{ width: '100%', height: '4rem' }}
      />
    </S.MainContainer>
  );
}

export default UserInfoSetting;
