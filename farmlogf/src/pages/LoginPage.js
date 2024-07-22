import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="username">아이디</label>
                    <input type="text" id="username" />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" />
                </div>
                <button type="submit">로그인</button>
                <Link to="/signup">
                    <button>회원가입</button>
                </Link>
            </form>
        </div>
    );
}

export default Login;