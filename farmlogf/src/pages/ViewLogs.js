import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // AuthContext 임포트

function ViewLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext); // AuthContext 사용

  useEffect(() => {
    const fetchLogs = async () => {
      const accessToken = localStorage.getItem('access');
      if (!accessToken) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        setIsAuthenticated(false); // 로그아웃 상태로 설정
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/farmlog/logsview/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        setLogs(response.data);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
        setError('기록을 가져오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [setIsAuthenticated]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h1>기록 보기</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <p>{log.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewLogs;