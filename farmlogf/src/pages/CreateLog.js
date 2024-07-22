import React, { useState } from 'react';

function CreateLog() {
  const [log, setLog] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Log:', log);
    setLog('');
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