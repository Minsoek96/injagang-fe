import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import styled, { css } from 'styled-components';

import { shakeAnimation } from '@/src/shared/styles';

import { MainButton, InputField } from '@/src/shared/components';
import { useLoginLogic } from './hooks';

function Login() {
  const router = useRouter();
  const {
    loginInfo,
    handleChange,
    handleSubmit,
    logicErrorMsg,
    loginIdRef,
    passwordRef,
    serverErrorMsg,
  } = useLoginLogic();
  const [shakeTrigger, setShakeTrigger] = useState<boolean>(false);

  const isError = serverErrorMsg !== '' || logicErrorMsg !== '';

  useEffect(() => {
    if (isError) {
      setShakeTrigger(false);
      setTimeout(() => {
        setShakeTrigger(true);
      }, 50);
    }
  }, [serverErrorMsg, logicErrorMsg, isError]);

  return (
    <Form $shakeTrigger={shakeTrigger} onSubmit={handleSubmit}>
      <InputField
        label="아이디"
        ref={loginIdRef}
        type="text"
        name="loginId"
        value={loginInfo.loginId}
        onChange={handleChange}
      />
      <InputField
        label="비밀번호"
        ref={passwordRef}
        type="password"
        name="password"
        value={loginInfo.password}
        onChange={handleChange}
      />
      {isError && <ERROR>{logicErrorMsg || serverErrorMsg}</ERROR>}
      <MainButton type="submit" label="로그인" sx={{ marginBottom: '.5rem' }} />
      <MainButton onAction={() => router.replace('/join')} label="회원가입" />
    </Form>
  );
}

export default Login;

const Form = styled.form<{ $shakeTrigger: boolean }>`
  display: flex;
  flex-direction: column;
  width: 30rem;
  padding: 2rem;
  border-radius: .8rem;
  background-color: #15202b;
  ${({ $shakeTrigger }) =>
    $shakeTrigger
    && css`
      animation: ${shakeAnimation} 0.5s;
    `}

  button {
    height: 4rem;
    background-color: #2ecc71;
  }
`;

const ERROR = styled.div`
  color: red;
`;
