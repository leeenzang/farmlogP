import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar'; // 네비게이션 바 컴포넌트를 임포트
import CreateLog from './pages/CreateLog';
import ViewLogs from './pages/ViewLogs';
import Login from './pages/LoginPage';
import Logout from './pages/Logout';
import Signup from './pages/SignupPage';
import ProtectedRoute from './ProtectedRoute'; // ProtectedRoute 컴포넌트를 임포트
import { AuthProvider } from './context/AuthContext'; // AuthProvider 임포트
import LogDetail from './pages/LogDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar /> {/* 네비게이션 바 추가 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-log" element={<ProtectedRoute element={<CreateLog />} />} />
            <Route path="/view-logs" element={<ProtectedRoute element={<ViewLogs />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/log/:id" element={<LogDetail />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;