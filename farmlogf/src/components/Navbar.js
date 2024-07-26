import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 토큰 확인
    const token = localStorage.getItem('access');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsAuthenticated(false);
    navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">
            <img src="/farmhome.png" alt="Home" />
          </Link>
        </li>
        <div className="navbig">
          <li><Link to="/create-log">기록하기</Link></li>
          <li><Link to="/view-logs">기록보기</Link></li>
        </div>
        <div className="navs">
          {isAuthenticated ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;