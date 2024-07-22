import React from 'react';

function Signup() {
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="username">이름</label>
                    <input type="text" id="username" />
                </div>
                <div>
                    <label htmlFor="email">아이디</label>
                    <input type="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" />
                </div>
                <div>
                    <label htmlFor="confirm-password">비밀번호 확인</label>
                    <input type="password" id="confirm-password" />
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default Signup;