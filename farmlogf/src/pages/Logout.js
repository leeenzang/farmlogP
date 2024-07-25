import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // 로그아웃 로직을 여기에 추가 (예: 토큰 삭제)
    console.log('Logged out');
    navigate('/'); // 홈으로 리디렉션
  }, [navigate]);

  return (
    <div>
      <h1>Logout</h1>
      <p>Redirecting to home...</p>
    </div>
  );
}

export default Logout;