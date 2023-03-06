import { FlexBox } from "@/styles/GlobalStyle";
import { useState } from "react";
import styled from "styled-components";

const LoginStyle = styled.div`
  ${FlexBox};
  height: 100vh;
  width: 100vw;
  background-color:#31404E;
  color:${({theme}) => theme.colors.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  background-color: #15202B;
  box-shadow: 0 4px 8px rgba(14, 13, 13, 0.2);
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #2ecc71;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    nickName: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(loginInfo);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInfo(cur => ({
      ...cur,
      [name]: value,
    }));
  };

  return (
    <LoginStyle>
      <Form onSubmit={handleSubmit}>
        <Label>이메일</Label>
        <Input
          type="email"
          name="email"
          value={loginInfo.email}
          onChange={handleChange}
        />
        <Label>비밀번호</Label>
        <Input
          type="password"
          name="password"
          value={loginInfo.password}
          onChange={handleChange}
        />
        <Button type="submit">로그인</Button>
      </Form>
    </LoginStyle>
  );
};

export default LoginPage;