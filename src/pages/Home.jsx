import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const HomeWrapper = styled.article`
  width: 520px;
  margin: 100px auto;
  border: 1px solid var(--color-border);
  border-radius: 10px;
`;

const HomeHeader = styled.header`
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

export default function Main() {
  const navigate = useNavigate();

  const handleClickLoginBtn = () => {
    navigate("/signin");
  };

  return (
    <HomeWrapper>
      <HomeHeader>
        <HeaderTitle>원티드</HeaderTitle>
      </HomeHeader>
      <LoginSection>
        <h3>원티드 프리온보딩 인턴십에 오신걸 환영합니다!</h3>
        <form>
          <LoginButton type="button" onClick={handleClickLoginBtn}>
            로그인
          </LoginButton>
          <Signup>
            <SignupButton to="/signup">회원가입</SignupButton>
          </Signup>
        </form>
      </LoginSection>
    </HomeWrapper>
  );
}
