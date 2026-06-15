import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './WorkoutHistory.css';

function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/api/workouts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setLoading(false);
    }
  };

  const deleteWorkout = async (id) => {
    if (!window.confirm('Delete this workout?')) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/workouts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkouts(workouts.filter((w) => w._id !== id));
      alert('✅ Workout deleted!');
    } catch (err) {
      console.error('Error deleting workout:', err);
      alert('❌ Error deleting workout');
    }
  };

  return (
    <div className="workout-history">
      <div className="history-header">
        <h2>📊 Workout History</h2>
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading workouts...</p>
      ) : workouts.length === 0 ? (
        <div className="empty-state">
          <p>No workouts yet. Start your first workout! 🏋️</p>
          <button className="btn-start-workout" onClick={() => navigate('/pose-detection')}>
            Start Workout
          </button>
        </div>
      ) : (
        <>
          <div className="history-stats">
            <div className="summary-card">
              <h3>Total Workouts</h3>
              <p>{workouts.length}</p>
            </div>
            <div className="summary-card">
              <h3>Total Reps</h3>
              <p>{workouts.reduce((acc, w) => acc + (w.reps || 0), 0)}</p>
            </div>
            <div className="summary-card">
              <h3>Total Calories</h3>
              <p>{workouts.reduce((acc, w) => acc + (w.calories || 0), 0)}</p>
            </div>
            <div className="summary-card">
              <h3>Total Time</h3>
              <p>{Math.round(workouts.reduce((acc, w) => acc + (w.duration || 0), 0) / 60)}m</p>
            </div>
          </div>

          <div className="workouts-list">
            {workouts.map((workout, index) => (
              <div key={workout._id} className="workout-card">
                <div className="workout-info">
                  <h4>{index + 1}. {workout.exerciseName}</h4>
                  <div className="workout-details">
                    <span>📊 {workout.reps} reps × {workout.sets} sets</span>
                    <span>⏱️ {workout.duration}s</span>
                    <span>🔥 {workout.calories} cal</span>
                    <span>📅 {new Date(workout.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deleteWorkout(workout._id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WorkoutHistory;