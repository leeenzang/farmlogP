import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Logout() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const logout = async () => {
      const refreshToken = localStorage.getItem('refresh');
      if (refreshToken) {
        try {
          await axios.post('http://127.0.0.1:8000/users/logout/', { refresh: refreshToken }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        } catch (error) {
          console.error('서버 로그아웃 실패:', error.response ? error.response.data : error.message);
        }
      }
      // 로컬 스토리지에서 JWT 토큰 삭제
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      setIsAuthenticated(false);
      console.log('Logged out');
      navigate('/'); // 홈으로 리디렉션
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