# Personalized Fitness Coach App

A web-based fitness coaching application using React, Node.js, Express, MongoDB, and MediaPipe for real-time pose detection.

## Features
- User Authentication (Login/Signup)
- Real-time Pose Detection using Webcam
- Automatic Rep Counter
- Workout History Tracking
- Progress Analytics
- User Profile Management

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **AI/ML:** MediaPipe (Pose Detection)
- **Authentication:** JWT

## Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (free)
- Git

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/720723110025-max/fitness-coach-app.git
cd fitness-coach-app
```

#### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT Secret
npm start
```

#### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm start
```

The app will run on `http://localhost:3000`

## 3-Week Development Plan

### Week 1: Backend Setup & Authentication ✅
- [x] Setup Node.js + Express server
- [x] Connect MongoDB
- [x] Implement user registration & login
- [x] Create JWT authentication
- [x] Create API endpoints

### Week 2: Frontend Setup & UI
- [ ] Create React project structure
- [ ] Build login/signup pages
- [ ] Create dashboard
- [ ] Setup API integration

### Week 3: Pose Detection & Features
- [ ] Integrate MediaPipe
- [ ] Implement real-time pose detection
- [ ] Build rep counter
- [ ] Display workout analytics

## Project Structure
```
fitness-coach-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Workout.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   └── workouts.js
│   ├── .env.example
│   ├── .gitignore
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   └── Auth.css
│   │   │   └── Dashboard.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .gitignore
│   ├── package.json
│   └── public/index.html
├── docs/
│   ├── SETUP.md
│   └── API_ENDPOINTS.md
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Workouts
- `POST /api/workouts` - Save workout
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get specific workout
- `DELETE /api/workouts/:id` - Delete workout

## Resources
- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [MediaPipe Documentation](https://google.github.io/mediapipe/)
- [JWT Documentation](https://jwt.io/)

## Next Steps
1. Setup MongoDB Atlas account
2. Configure .env file with MongoDB URI
3. Start backend server
4. Start frontend server
5. Test login/registration
6. Integrate MediaPipe for pose detection

## License
MIT