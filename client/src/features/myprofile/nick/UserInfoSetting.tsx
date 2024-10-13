import { S } from '@/src/features/myprofile/common';

import useNick from '@/src/features/myprofile/nick/model/useNick';
import NickForm from './NickForm';

function UserInfoSetting() {
  const { changeNickname } = useNick();
  const mainTitle = '닉네임 변경';

  // 닉네임 변경 처리 함수
  const onSubmit = (data: { nickName: string }) => {
    changeNickname(data.nickName);
  };

  return (
    <S.MainContainer $size={{ height: '100%', width: '100%', flex: 'Col' }}>
      <S.MainTitle>{mainTitle}</S.MainTitle>
      <NickForm onSubmit={onSubmit} />
    </S.MainContainer>
  );
}

export default UserInfoSetting;
