import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateLog = () => {
    const [log, setLog] = useState({
        date: new Date().toISOString().split('T')[0], // 오늘 날짜 기본 값 설정
        lunar_date: '', // 음력 날짜 필드 추가
        max_temp: '',
        min_temp: '',
        weather: '',
        content: '',
        title: '' // 제목 필드 추가
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLog((prevLog) => ({
            ...prevLog,
            [id]: value
        }));
    };

    const fetchWeatherAndLunarDate = async (date) => {
        setLoading(true);
        setError('');
        try {
            const lunarResponse = await axios.post('http://127.0.0.1:8000/farmlog/calculate-lunar-date/', { date });
            const lunar_date = lunarResponse.data.lunar_date;

            const weatherResponse = await axios.get('http://127.0.0.1:8000/dashboard/', {
                params: { date }
            });
            const weather_data = weatherResponse.data;

            const dayOfWeek = new Date(date).toLocaleDateString('ko-KR', { weekday: 'long' });
            const title = `${date.split('-')[0]}년 ${date.split('-')[1]}월 ${date.split('-')[2]}일 ${dayOfWeek} 기록입니다.`;

            setLog((prevLog) => ({
                ...prevLog,
                lunar_date,
                max_temp: weather_data.highest_temp,
                min_temp: weather_data.lowest_temp,
                weather: weather_data.current_weather,
                title // 제목 설정
            }));
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setError('데이터를 가져오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const todayDate = new Date().toISOString().split('T')[0];
        fetchWeatherAndLunarDate(todayDate);
    }, []);

    const handleDateChange = async (e) => {
        const date = e.target.value;
        setLog((prevLog) => ({
            ...prevLog,
            date
        }));
        fetchWeatherAndLunarDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
            setError('No access token found');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/farmlog/logs/', log, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            setSuccess('기록이 성공적으로 작성되었습니다.');
            console.log('Log created:', response.data);
            // 성공 시 폼 초기화 또는 다른 동작을 추가할 수 있습니다.
            setLog({
                date: new Date().toISOString().split('T')[0],
                lunar_date: '',
                max_temp: '',
                min_temp: '',
                weather: '',
                content: '',
                title: ''
            });
        } catch (error) {
            console.error('Failed to create log:', error.response ? error.response.data : error.message);
            setError('기록 작성에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>기록하기</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">날짜</label>
                    <input
                        type="date"
                        id="date"
                        value={log.date}
                        onChange={handleDateChange}
                    />
                </div>
                <div>
                    <label htmlFor="lunar_date">음력날짜</label>
                    <input
                        type="text"
                        id="lunar_date"
                        value={log.lunar_date}
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="max_temp">최고온도</label>
                    <input
                        type="number"
                        id="max_temp"
                        value={log.max_temp}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="min_temp">최저온도</label>
                    <input
                        type="number"
                        id="min_temp"
                        value={log.min_temp}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="weather">날씨</label>
                    <input
                        type="text"
                        id="weather"
                        value={log.weather}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        value={log.content}
                        onChange={handleChange}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit" disabled={loading}>{loading ? '제출 중...' : '제출하기'}</button>
            </form>
        </div>
    );
};

export default CreateLog;