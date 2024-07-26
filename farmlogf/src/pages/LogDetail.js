import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // AuthContext 임포트
import { useParams, useNavigate } from 'react-router-dom';

function LogDetail() {
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext); // AuthContext 사용
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLog = async () => {
      const accessToken = localStorage.getItem('access');
      if (!accessToken) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        setIsAuthenticated(false); // 로그아웃 상태로 설정
        navigate('/login'); // 로그인 페이지로 리디렉션
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:8000/farmlog/logs/${id}/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        setLog(response.data);
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
            const retryResponse = await axios.get(`http://127.0.0.1:8000/farmlog/logs/${id}/`, {
              headers: {
                'Authorization': `Bearer ${refreshResponse.data.access}`,
                'Content-Type': 'application/json'
              }
            });
            setLog(retryResponse.data);
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

    fetchLog();
  }, [id, setIsAuthenticated, navigate]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      {log ? (
        <>
          <h1>{log.title}</h1>
          <p>날짜: {log.date}</p>
          <p>음력 날짜: {log.lunar_date}</p>
          <p>최고 온도: {log.max_temp}</p>
          <p>최저 온도: {log.min_temp}</p>
          <p>날씨: {log.weather}</p>
          <p>내용: {log.content}</p>
        </>
      ) : (
        <p>기록을 찾을 수 없습니다.</p>
      )}
    </div>
  );
}

export default LogDetail;