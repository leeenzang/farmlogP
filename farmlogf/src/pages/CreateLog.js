import React, { useState } from 'react';
import axios from 'axios';

const CreateLog = () => {
    const [log, setLog] = useState({
        date: new Date().toISOString().split('T')[0], // 오늘 날짜 기본 값 설정
        lunar_date: '', // 음력 날짜 필드 추가
        max_temp: '',
        min_temp: '',
        weather: '',
        content: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLog((prevLog) => ({
            ...prevLog,
            [id]: value
        }));
    };

    const handleDateChange = async (e) => {
        const date = e.target.value;
        setLog((prevLog) => ({
            ...prevLog,
            date
        }));

        // 선택한 날짜로 음력 날짜를 계산하기 위한 API 호출
        try {
            const response = await axios.post('http://127.0.0.1:8000/farmlog/calculate-lunar-date/', { date });
            setLog((prevLog) => ({
                ...prevLog,
                lunar_date: response.data.lunar_date
            }));
        } catch (error) {
            console.error('Failed to fetch lunar date:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting log:', log); // 디버깅을 위한 콘솔 로그 추가

        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
            console.error('No access token found');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/farmlog/logs/', log, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Log created:', response.data);
            // 성공 시 폼 초기화 또는 다른 동작을 추가할 수 있습니다.
            setLog({
                date: new Date().toISOString().split('T')[0],
                lunar_date: '',
                max_temp: '',
                min_temp: '',
                weather: '',
                content: ''
            });
        } catch (error) {
            console.error('Failed to create log:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h1>Create Log</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={log.date}
                        onChange={handleDateChange}
                    />
                </div>
                <div>
                    <label htmlFor="lunar_date">Lunar Date:</label>
                    <input
                        type="text"
                        id="lunar_date"
                        value={log.lunar_date}
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="max_temp">Max Temperature:</label>
                    <input
                        type="number"
                        id="max_temp"
                        value={log.max_temp}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="min_temp">Min Temperature:</label>
                    <input
                        type="number"
                        id="min_temp"
                        value={log.min_temp}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="weather">Weather:</label>
                    <input
                        type="text"
                        id="weather"
                        value={log.weather}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={log.content}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateLog;