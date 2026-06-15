import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    axios
      .get('/api/workouts', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWorkouts(res.data.slice(0, 5)))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>🏋️ Fitness Coach</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome, {user?.name}! 👋</h2>
          <p>Ready to crush your fitness goals?</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>🏃 Total Workouts</h3>
            <p className="stat-value">{workouts.length}</p>
          </div>
          <div className="stat-card">
            <h3>🔥 Calories Burned</h3>
            <p className="stat-value">
              {workouts.reduce((acc, w) => acc + (w.calories || 0), 0)}
            </p>
          </div>
          <div className="stat-card">
            <h3>⏱️ Total Time</h3>
            <p className="stat-value">
              {Math.round(workouts.reduce((acc, w) => acc + (w.duration || 0), 0) / 60)}m
            </p>
          </div>
          <div className="stat-card">
            <h3>💪 Reps Done</h3>
            <p className="stat-value">{workouts.reduce((acc, w) => acc + (w.reps || 0), 0)}</p>
          </div>
        </div>

        {workouts.length > 0 && (
          <div className="recent-workouts">
            <h3>Recent Workouts</h3>
            <ul>
              {workouts.map((workout, index) => (
                <li key={index}>
                  <span>{workout.exerciseName}</span>
                  <span>{workout.reps} reps × {workout.sets} sets</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;