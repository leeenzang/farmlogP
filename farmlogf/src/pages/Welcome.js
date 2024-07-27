import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div>
      <h1>환영합니다!</h1>
      <p>농사일지를 기록하려면 로그인해주세요.</p>
      <Link to="/login">로그인</Link> | <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default Welcome;