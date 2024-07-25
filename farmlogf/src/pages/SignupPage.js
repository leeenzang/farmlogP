import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [formData, setFormData] = useState({
        userID: '',
        name: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/users/register/', {
                userID: formData.userID,
                name: formData.name,
                password: formData.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('회원가입 성공:', response.data);
        } catch (error) {
            console.error('회원가입 실패:', error.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userID">아이디</label>
                    <input type="text" id="userID" value={formData.userID} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="name">이름</label>
                    <input type="text" id="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default Signup;