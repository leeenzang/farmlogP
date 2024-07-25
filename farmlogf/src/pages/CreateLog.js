import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // 올바른 경로로 수정

function CreateLog() {
  const [log, setLog] = useState('');
  const { isAuthenticated } = useContext(AuthContext); // 로그인 상태 확인

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/logs/', {
        content: log,
        date: new Date().toISOString().split('T')[0] // 현재 날짜를 ISO 형식으로 전달
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}` // JWT 토큰을 헤더에 포함
        }
      });

      console.log('New Log:', response.data);
      setLog('');
    } catch (error) {
      console.error('로그 생성 실패:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Create Log</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="log">Log:</label>
          <input
            type="text"
            id="log"
            value={log}
            onChange={(e) => setLog(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateLog;