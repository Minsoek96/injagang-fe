import styled from 'styled-components';
import { BaseButton } from '@/src/shared/components/button';

import { styleMixin } from '@/src/shared/styles';
import { authType } from '@/src/entities/auth';

import { useMyProfileManager, useMyProfileLogic } from './hooks';

interface PasswordInputProps {
  title: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PasswordInputItem({
  title,
  name,
  value,
  onChange,
}: PasswordInputProps) {
  return (
    <Container>
      <h3>{title}</h3>
      <Input value={value} type="password" name={name} onChange={onChange} />
    </Container>
  );
}

function PassWordSetting() {
  const { dispatchPasswordChange } = useMyProfileManager();
  const { passWordInfo, handleInfoChange } = useMyProfileLogic();

  const labels = {
    nowPassword: '현재비밀번호',
    changePassword: '변경 비밀번호',
    changePasswordCheck: '비밀번호 확인',
  };

  return (
    <PassWordContainer>
      {Object.keys(passWordInfo).map((key) => (
        <PasswordInputItem
          key={key}
          name={key}
          value={passWordInfo[key as keyof authType.IChangePw]}
          title={labels[key as keyof authType.IChangePw]}
          onChange={handleInfoChange}
        />
      ))}
      <BaseButton
        $Size={{ width: '95%', font: '15px' }}
        onClick={() => dispatchPasswordChange(passWordInfo)}
      >
        변경
      </BaseButton>
    </PassWordContainer>
  );
}

export default PassWordSetting;

const PassWordContainer = styled.div`
  ${styleMixin.Column()}
  width: 100%;
  height: 250px;
  padding: 15px;
  background-color: #494747;
  button {
    display: block;
  }
  @media screen and (max-width: 900px) {
    height: 500px;
    gap: 15px;
  }
`;

const Input = styled.input`
  display: flex;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 150px;
`;

const Container = styled.div`
  ${styleMixin.Flex()}
  width: 90%;
  h3 {
    margin: 12px auto;
  }
  @media screen and (max-width: 900px) {
    ${styleMixin.Column()}
  }
`;
