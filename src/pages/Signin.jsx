import React, { useState } from "react";
import { postLogin } from "../api/loginApi";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";

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

  &:disabled {
    background-color: var(--color-border);
    cursor: default;
  }
`;

const Signup = styled.div`
  text-align: center;
`;

const SignupButton = styled(Link)`
  font-size: 14px;
  color: #767676;
`;

const StyledText = styled.p`
  display: block;
  color: red;
  font-size: 12px;
  margin-top: -12px;
  margin-bottom: 20px;
`;

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const navigate = useNavigate();

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postLogin({ email, password });
      localStorage.setItem("token", response.access_token);
      navigate("/todo");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("로그인 정보가 일치하지 않습니다");
      } else {
        console.error(error);
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(e.target.value === "" || e.target.value.includes("@"));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsValidPassword(e.target.value === "" || e.target.value.length >= 8);
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
            onChange={handleEmailChange}
          />
          {!isValidEmail && email !== "" && (
            <StyledText className="error-message">
              유효한 이메일을 입력하세요.
            </StyledText>
          )}
          <InputLabel htmlFor="inpPw">비밀번호 입력</InputLabel>
          <StyledInput
            id="inpPw"
            type="password"
            data-testid="password-input"
            value={password}
            onChange={handlePasswordChange}
          />
          {!isValidPassword && password !== "" && (
            <StyledText className="error-message">
              비밀번호는 8자 이상 입력하세요.
            </StyledText>
          )}
          <LoginButton
            type="submit"
            data-testid="signin-button"
            disabled={
              email === "" ||
              password === "" ||
              !isValidEmail ||
              !isValidPassword
            }>
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
