import { S } from '@/src/features/myprofile/common';
import { authType } from '@/src/entities/auth';
import { InputField, MainButton } from '@/src/shared/components';

import { useMyProfileManager, useMyProfileLogic } from './hooks';

function PassWordSetting() {
  const { dispatchPasswordChange } = useMyProfileManager();
  const { passWordInfo, handleInfoChange } = useMyProfileLogic();

  const labels = {
    nowPassword: '현재비밀번호',
    changePassword: '변경 비밀번호',
    changePasswordCheck: '비밀번호 확인',
  };

  return (
    <S.MainContainer $size={{ height: '100%', width: '100%', flex: 'Col' }}>
      <S.MainTitle>비밀번호 변경</S.MainTitle>
      {Object.keys(passWordInfo).map((key) => (
        <InputField
          key={key}
          name={key}
          type="password"
          value={passWordInfo[key as keyof authType.IChangePw]}
          label={labels[key as keyof authType.IChangePw]}
          onChange={handleInfoChange}
        />
      ))}
      <MainButton
        label="변경"
        sx={{ width: '100%', height: '4rem' }}
        onAction={() => dispatchPasswordChange(passWordInfo)}
      />
    </S.MainContainer>
  );
}

export default PassWordSetting;
