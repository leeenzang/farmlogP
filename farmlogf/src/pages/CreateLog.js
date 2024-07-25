import React, { useState } from 'react';
import axios from 'axios';

const CreateLog = () => {
    const [log, setLog] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // 오늘 날짜 기본 값 설정

    const handleSubmit = async (e) => {
        e.preventDefault();

        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            console.error('No access token found');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/farmlog/logs/', {
                date,
                content: log
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log('Log created:', response.data);
        } catch (error) {
            console.error('Failed to create log:', error);
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
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateLog;