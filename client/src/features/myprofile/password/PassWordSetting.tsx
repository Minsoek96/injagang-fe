import { authType, S } from '@/src/entities/auth';

import usePassword from '@/src/features/myprofile/password/model/usePassword';
import PasswordForm from './PasswordForm';

function PassWordSetting() {
  const { confirmChangePassword } = usePassword();

  const onSubmit = (data: authType.IChangePw) => {
    confirmChangePassword(data);
  };

  const labels = {
    nowPassword: '현재 비밀번호',
    changePassword: '변경 비밀번호',
    changePasswordCheck: '비밀번호 확인',
  };

  return (
    <S.MainContainer $size={{ height: '100%', width: '100%', flex: 'Col' }}>
      <S.MainTitle>비밀번호 변경</S.MainTitle>
      <PasswordForm onSubmit={onSubmit} labels={labels} />
    </S.MainContainer>
  );
}

export default PassWordSetting;
