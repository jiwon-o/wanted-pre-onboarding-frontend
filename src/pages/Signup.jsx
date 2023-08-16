import React, { useState, useEffect } from "react";
import axios from "axios";
import { postSignup } from "../api/signupApi";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    try {
      postSignup({ email, password });
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={handleSignup}>
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
        <button data-testid="signup-button">회원가입</button>
      </form>
    </>
  );
}
