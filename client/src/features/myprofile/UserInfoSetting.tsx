import { useEffect, useState } from 'react';

import { RxAvatar } from 'react-icons/rx';

import styled from 'styled-components';

import { BaseButton } from '@/src/shared/components/button';

import { SessionStorageManager } from '@/src/shared/utils';
import { useAuthStore } from '@/src/entities/auth';
import useMyProfileManager from './hooks/useMyProfileManager';

function UserInfoSetting() {
  const { nickName: confirmNick } = useAuthStore();
  const [nickName, setNickName] = useState(confirmNick ?? '');
  const myInfo = new SessionStorageManager('info');
  const { dispatchNickNameChange } = useMyProfileManager();
  const mainTitle = '닉네임 변경';

  useEffect(() => {
    const getMyNick = myInfo.get();
    getMyNick && setNickName(getMyNick.nickname);
  }, []);

  return (
    <UserInfoStyle>
      <UserInfoContainer>
        <h3>{mainTitle}</h3>
        <Input
          value={nickName}
          name="changeNickname"
          onChange={(e) => setNickName(e.target.value)}
        />
        <BaseButton
          $Size={{ width: '80%', font: '15px' }}
          onClick={() => dispatchNickNameChange(nickName)}
        >
          변경
        </BaseButton>
      </UserInfoContainer>
      <RxAvatar />
    </UserInfoStyle>
  );
}

export default UserInfoSetting;

const UserInfoStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 250px;
  padding: 15px;
  svg {
    font-size: 150px;
  }
  background-color: #494747;
  border-radius: 5px;
`;

const UserInfoContainer = styled.div`
  width: 80%;
`;
const Input = styled.input`
  display: flex;
  padding: 8px;
  width: 80%;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;
