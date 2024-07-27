import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Dashboard from './Dashboard';
import Welcome from './Welcome';  // 로그인하지 않은 유저를 위한 컴포넌트

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      {isAuthenticated ? <Dashboard /> : <Welcome />}
    </div>
  );
};

export default Home;