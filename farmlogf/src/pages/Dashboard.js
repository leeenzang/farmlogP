import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';  // AuthContext 임포트

const Dashboard = () => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchWeatherInfo = async () => {
      const accessToken = localStorage.getItem('access');
      if (!accessToken) {
        setError('로그인이 필요합니다.');
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/dashboard/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        setWeatherInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch weather info:', error);
        setError('날씨 정보를 가져오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherInfo();
  }, [setIsAuthenticated]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h1>대시보드</h1>
      {weatherInfo && (
        <div>
          <p>날짜: {weatherInfo.date_of_today}</p>
          <p>현재 날씨: {weatherInfo.current_weather}</p>
          <p>최고 온도: {weatherInfo.highest_temp}°C</p>
          <p>최저 온도: {weatherInfo.lowest_temp}°C</p>
          <p>강수 확률: {weatherInfo.precipitation_probability}%</p>
          <p>습도: {weatherInfo.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;