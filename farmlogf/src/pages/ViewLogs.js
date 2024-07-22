import React from 'react';

const logs = [
  { id: 1, text: 'First log' },
  { id: 2, text: 'Second log' },
  { id: 3, text: 'Third log' },
];

function ViewLogs() {
  return (
    <div>
      <h1>View Logs</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>{log.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ViewLogs;