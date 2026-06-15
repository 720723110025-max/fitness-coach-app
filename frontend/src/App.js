import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PoseDetection from './pages/PoseDetection';
import WorkoutHistory from './pages/WorkoutHistory';
import Clock from './pages/Clock';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/pose-detection"
          element={isAuthenticated ? <PoseDetection /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={isAuthenticated ? <WorkoutHistory /> : <Navigate to="/login" />}
        />
        <Route
          path="/clock"
          element={<Clock />}
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;