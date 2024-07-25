import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // AuthContext 임포트

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // AuthContext 사용
  const navigate = useNavigate();

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