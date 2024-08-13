import styled from 'styled-components';

import { InputField, MainButton } from '@/src/shared/components';

import useSignUpLogic from './hooks/useSignUpLogic';

function SignUp() {
  const {
    handleSubmit, handleValueChange, userMsg, joinInfo, refs,
  } = useSignUpLogic();

  return (
    <Form onSubmit={handleSubmit}>
      <InputField
        label="아이디"
        type="test"
        name="loginId"
        ref={refs.loginId}
        value={joinInfo.loginId}
        onChange={handleValueChange}
      />
      <InputField
        label="비밀번호"
        type="password"
        name="password"
        ref={refs.passwordRef}
        value={joinInfo.password}
        onChange={handleValueChange}
      />
      <InputField
        label="재확인"
        type="password"
        name="confirmPassword"
        ref={refs.confirmPasswordRef}
        value={joinInfo.confirmPassword}
        onChange={handleValueChange}
      />
      <InputField
        label="이메일"
        type="email"
        name="email"
        ref={refs.emailRef}
        value={joinInfo.email}
        onChange={handleValueChange}
      />
      <InputField
        label="닉네임"
        type="text"
        name="nickName"
        ref={refs.nickNameRef}
        value={joinInfo.nickName}
        onChange={handleValueChange}
      />
      <WarningMsg>{userMsg}</WarningMsg>
      <MainButton
        type="submit"
        label="회원가입"
        sx={{ backgroundColor: '#2ecc71', height: '4rem' }}
      />
    </Form>
  );
}

export default SignUp;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 30rem;
  padding: 2rem;
  border-radius: 0.8rem;
  background-color: #15202b;
`;

const WarningMsg = styled.p`
  margin-bottom: 8px;
  color: red;
  text-align: center;
`;
