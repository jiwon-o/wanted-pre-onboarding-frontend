import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  const handleClickLoginBtn = () => {
    navigate("/signin");
  };

  return (
    <div>
      <form>
        <button onClick={handleClickLoginBtn}>로그인</button>
        <Link to="/signup">회원가입</Link>
      </form>
    </div>
  );
}
