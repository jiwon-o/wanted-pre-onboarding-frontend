import React, { useState } from "react";
import { postLogin } from "../api/loginApi";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const LoginWrapper = styled.article`
  width: 520px;
  margin: 100px auto;
  border: 1px solid var(--color-border);
  border-radius: 10px;
`;

const LoginHeader = styled.header`
  text-align: center;
  border-bottom: 1px solid var(--color-border);
`;

const HeaderTitle = styled.h2`
  padding: 20px 0;
`;

const LoginSection = styled.section`
  padding: 26px 24px;

  h3 {
    margin-bottom: 20px;
  }
`;

const InputLabel = styled.label`
  display: inline-block;
  font-size: 16px;
  vertical-align: -2px;
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 15px 16px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;

  &:focus {
    outline: 2px solid #2f80ed;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #2f80ed;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  margin-bottom: 20px;
`;

const Signup = styled.div`
  text-align: center;
`;

const SignupButton = styled(Link)`
  font-size: 14px;
  color: #767676;
`;

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postLogin({ email, password });
      localStorage.setItem("token", response.access_token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginWrapper>
      <LoginHeader>
        <HeaderTitle>로그인</HeaderTitle>
      </LoginHeader>
      <LoginSection>
        <form onSubmit={handleSignInSubmit}>
          <InputLabel htmlFor="inpEmail">이메일 입력</InputLabel>
          <StyledInput
            id="inpEmail"
            type="email"
            data-testid="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputLabel htmlFor="inpPw">비밀번호 입력</InputLabel>
          <StyledInput
            id="inpPw"
            type="password"
            data-testid="password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton type="button" data-testid="signin-button">
            로그인
          </LoginButton>
          <Signup>
            <SignupButton to="/signup">회원가입</SignupButton>
          </Signup>
        </form>
      </LoginSection>
    </LoginWrapper>
  );
}
