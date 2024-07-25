import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // AuthContext 임포트

function Logout() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext); // AuthContext 사용

  useEffect(() => {
    const logout = async () => {
      try {
        const refreshToken = localStorage.getItem('refresh');
        if (refreshToken) {
          await axios.post('http://127.0.0.1:8000/users/logout/', {
            refresh: refreshToken
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
      } catch (error) {
        console.error('로그아웃 실패:', error.response?.data || error.message);
      } finally {
        // 로컬 스토리지에서 토큰 삭제
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsAuthenticated(false); // 인증 상태 업데이트
        navigate('/login'); // 홈으로 리디렉션
      }
    };

    logout();
  }, [navigate, setIsAuthenticated]);

  return (
    <div>
      <h1>Logout</h1>
      <p>Redirecting to home...</p>
    </div>
  );
}

export default Logout;