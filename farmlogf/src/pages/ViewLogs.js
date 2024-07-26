import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const accessToken = localStorage.getItem('access');
      if (!accessToken) {
        console.error('No access token found');
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
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h1>View Logs</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <p>Date: {log.date}</p>
            <p>Lunar Date: {log.lunar_date}</p>
            <p>Max Temperature: {log.max_temp}</p>
            <p>Min Temperature: {log.min_temp}</p>
            <p>Weather: {log.weather}</p>
            <p>Content: {log.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewLogs;