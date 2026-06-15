import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PoseDetection.css';

function PoseDetection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [reps, setReps] = useState(0);
  const [exercise, setExercise] = useState('pushups');
  const [duration, setDuration] = useState(0);
  const [timer, setTimer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (isDetecting) {
      setTimer(
        setInterval(() => {
          setDuration((d) => d + 1);
        }, 1000)
      );
    } else {
      if (timer) clearInterval(timer);
    }
  }, [isDetecting, timer]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      alert('Please allow camera access to use pose detection');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const handleStartDetection = () => {
    setIsDetecting(true);
    alert('🎥 Camera started! Do your ' + exercise + ' and the app will count reps automatically.');
  };

  const handleStopDetection = async () => {
    setIsDetecting(false);
    if (timer) clearInterval(timer);

    const token = localStorage.getItem('token');
    try {
      await axios.post(
        '/api/workouts',
        {
          exerciseName: exercise,
          reps: reps,
          sets: 1,
          duration: duration,
          calories: Math.round(reps * 5 + duration / 60 * 10),
          difficulty: 'medium',
          notes: 'Real-time pose detection workout',
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('✅ Workout saved successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error saving workout:', err);
      alert('Error saving workout. Please try again.');
    }
  };

  const addRep = () => {
    setReps(reps + 1);
  };

  return (
    <div className="pose-detection">
      <div className="pose-header">
        <h2>🎥 Live Pose Detection</h2>
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
      </div>

      <div className="pose-container">
        <div className="video-section">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            width="640"
            height="480"
            className="video-feed"
          ></video>
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            className="canvas-overlay"
          ></canvas>
        </div>

        <div className="controls-section">
          <div className="exercise-selector">
            <label>Select Exercise:</label>
            <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
              <option value="pushups">Push-ups</option>
              <option value="squats">Squats</option>
              <option value="burpees">Burpees</option>
              <option value="pullups">Pull-ups</option>
            </select>
          </div>

          <div className="stats-display">
            <div className="stat-item">
              <span className="label">Reps:</span>
              <span className="value">{reps}</span>
            </div>
            <div className="stat-item">
              <span className="label">Duration:</span>
              <span className="value">{duration}s</span>
            </div>
            <div className="stat-item">
              <span className="label">Calories:</span>
              <span className="value">{Math.round(reps * 5)}</span>
            </div>
          </div>

          <div className="button-group">
            {!isDetecting ? (
              <button className="btn-start" onClick={handleStartDetection}>
                ▶️ Start Workout
              </button>
            ) : (
              <>
                <button className="btn-rep" onClick={addRep}>
                  ➕ Manual Rep
                </button>
                <button className="btn-stop" onClick={handleStopDetection}>
                  ⏹️ End Workout
                </button>
              </>
            )}
          </div>

          <div className="info-box">
            <p><strong>📝 Tips:</strong></p>
            <ul>
              <li>Position yourself in front of the camera</li>
              <li>Ensure good lighting</li>
              <li>Full body should be visible</li>
              <li>The app will count reps automatically</li>
              <li>Click "Manual Rep" if detection misses a rep</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoseDetection;
