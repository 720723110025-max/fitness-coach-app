# Setup Guide - Personalized Fitness Coach App

## Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (free at mongodb.com)
- Git
- VS Code or any code editor

## Step 1: Clone Repository

```bash
git clone https://github.com/720723110025-max/fitness-coach-app.git
cd fitness-coach-app
```

## Step 2: Backend Setup

### 2.1 Install Dependencies
```bash
cd backend
npm install
```

### 2.2 Setup MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with username and password
5. Get your connection string

### 2.3 Configure Environment Variables
```bash
cp .env.example .env
```

Edit `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness-coach
JWT_SECRET=your_super_secret_key_here_make_it_long
PORT=5000
NODE_ENV=development
```

### 2.4 Start Backend Server
```bash
npm start
```

You should see: `🚀 Server running on http://localhost:5000`

## Step 3: Frontend Setup

### 3.1 Open New Terminal Tab

### 3.2 Install Dependencies
```bash
cd frontend
npm install
```

### 3.3 Start Frontend
```bash
npm start
```

Browser will automatically open at `http://localhost:3000`

## Step 4: Test the Application

1. **Register Account**
   - Click "Register" on the login page
   - Enter name, email, password
   - Click "Register"

2. **Login**
   - Enter your email and password
   - Click "Login"

3. **Explore Dashboard**
   - View welcome message
   - Check stats (workouts, calories, time, reps)
   - View recent workouts

## Troubleshooting

### Backend won't start
- Check MongoDB URI in .env file
- Ensure MongoDB Atlas cluster is running
- Check if port 5000 is in use: `lsof -i :5000`

### Frontend won't start
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Check if port 3000 is in use: `lsof -i :3000`

### API connection errors
- Check that backend is running on port 5000
- Look at browser console (F12) for error details
- Check backend terminal for logs

## Next Steps

1. ✅ Backend & Frontend Running
2. Add Pose Detection with MediaPipe
3. Add Workout Recording Page
4. Add Workout History Page
5. Deploy to production

## File Structure

```
fitness-coach-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .gitignore
├── docs/
│   ├── SETUP.md
│   └── API_ENDPOINTS.md
└── README.md
```