import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // AuthContext 임포트
import { Link, useNavigate } from 'react-router-dom';

function ViewLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext); // AuthContext 사용
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      const accessToken = localStorage.getItem('access');
      if (!accessToken) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        setIsAuthenticated(false); // 로그아웃 상태로 설정
        navigate('/login'); // 로그인 페이지로 리디렉션
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
        if (error.response && error.response.status === 401) {
          // 토큰이 만료된 경우, 토큰을 새로 고침
          try {
            const refreshToken = localStorage.getItem('refresh');
            const refreshResponse = await axios.post('http://127.0.0.1:8000/users/token/refresh/', {
              refresh: refreshToken
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            });

            // 새로 받은 토큰을 로컬 스토리지에 저장
            localStorage.setItem('access', refreshResponse.data.access);

            // 다시 요청 시도
            const retryResponse = await axios.get('http://127.0.0.1:8000/farmlog/logsview/', {
              headers: {
                'Authorization': `Bearer ${refreshResponse.data.access}`,
                'Content-Type': 'application/json'
              }
            });
            setLogs(retryResponse.data);
          } catch (refreshError) {
            setError('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
            setIsAuthenticated(false);
            navigate('/login'); // 로그인 페이지로 리디렉션
          }
        } else {
          setError('기록을 가져오는데 실패했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [setIsAuthenticated, navigate]);

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
            <Link to={`/log/${log.id}`}>
              <p>{log.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewLogs;