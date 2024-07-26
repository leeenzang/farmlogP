import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // AuthContext 임포트

function LoginPage() {
  const [formData, setFormData] = useState({
    userID: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext); // AuthContext 사용
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/users/login/', {
        userID: formData.userID,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // JWT 토큰을 로컬 스토리지에 저장
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      setIsAuthenticated(true); // 로그인 상태 업데이트
      // 홈 페이지로 리디렉션
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error.response ? error.response.data : error.message);
      setError('로그인 실패: ' + (error.response ? error.response.data.detail : error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userID">아이디</label>
          <input type="text" id="userID" value={formData.userID} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>{loading ? '로그인 중...' : '로그인'}</button>
        <Link to="/signup">
          <button type="button">회원가입</button>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;