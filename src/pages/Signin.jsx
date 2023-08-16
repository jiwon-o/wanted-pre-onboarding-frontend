import React, { useState } from "react";
import { postLogin } from "../api/loginApi";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);

  const handleSignin = (e) => {
    e.preventDefault();
    try {
      const response = postLogin({ email, password });
      localStorage.setItem(response.access_token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={handleSignin}>
        <label id="email">이메일 입력</label>
        <input
          type="email"
          data-testid="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label id="password">비밀번호 입력</label>
        <input
          type="password"
          data-testid="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button data-testid="signin-button">로그인</button>
      </form>
    </>
  );
}
