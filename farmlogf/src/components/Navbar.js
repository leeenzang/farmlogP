import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
        <ul>
            <li>
                <Link to ="/">
                    <img src="/farmhome.png" alt="Home" />
                </Link>
            </li>
            <div class = "navbig">
                <li><Link to="/create-log">기록하기</Link></li>
                <li><Link to="/view-logs">기록보기</Link></li>
            </div>
            <div class = "navs">
                <Link to = "/login">로그인</Link>
                <Link to = "/signup">회원가입</Link>
            </div>
        </ul>
    </nav>
  );
}

export default Navbar;