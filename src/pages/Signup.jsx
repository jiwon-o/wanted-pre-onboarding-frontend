import React, { useState } from "react";
import { postSignUp } from "../api/signupApi";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const SignUpWrapper = styled.article`
  width: 520px;
  margin: 100px auto;
  border: 1px solid var(--color-border);
  border-radius: 10px;
`;

const SignUpHeader = styled.header`
  text-align: center;
  border-bottom: 1px solid var(--color-border);
`;

const HeaderTitle = styled.h2`
  padding: 20px 0;
`;

const SignUpSection = styled.section`
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

const SignUpButton = styled.button`
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

const Login = styled.div`
  text-align: center;
`;

const LoginButton = styled(Link)`
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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const navigate = useNavigate();

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    try {
      postSignUp({ email, password });
      alert("성공적으로 회원가입 되었습니다.");
      navigate("/signin");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("이미 가입된 이메일입니다.");
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
    <SignUpWrapper>
      <SignUpHeader>
        <HeaderTitle>회원가입</HeaderTitle>
      </SignUpHeader>
      <SignUpSection>
        <form onSubmit={handleSignUpSubmit}>
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
          <SignUpButton
            type="submit"
            data-testid="signup-button"
            disabled={
              email === "" ||
              password === "" ||
              !isValidEmail ||
              !isValidPassword
            }>
            회원가입
          </SignUpButton>
          <Login>
            <LoginButton to="/signin">로그인</LoginButton>
          </Login>
        </form>
      </SignUpSection>
    </SignUpWrapper>
  );
}
