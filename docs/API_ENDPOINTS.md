# API Endpoints Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token:
```
Authorization: Bearer <your_jwt_token>
```

---

## Auth Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response 201:
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "60d5ec49c1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response 200:
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "60d5ec49c1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## User Endpoints

### Get User Profile
```
GET /user/profile
Authorization: Bearer <token>

Response 200:
{
  "_id": "60d5ec49c1234567890abcd",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "weight": 70,
  "height": 180,
  "fitnessLevel": "beginner",
  "goals": ["build muscle", "lose weight"],
  "createdAt": "2023-01-15T10:30:00Z"
}
```

### Update User Profile
```
PUT /user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "age": 26,
  "weight": 68,
  "height": 180,
  "fitnessLevel": "intermediate",
  "goals": ["build muscle"]
}

Response 200:
{
  "message": "Profile updated",
  "user": { ... }
}
```

---

## Workout Endpoints

### Save Workout
```
POST /workouts
Authorization: Bearer <token>
Content-Type: application/json

{
  "exerciseName": "pushups",
  "reps": 25,
  "sets": 3,
  "duration": 300,
  "calories": 150,
  "difficulty": "medium",
  "notes": "Great workout!"
}

Response 201:
{
  "message": "Workout saved",
  "workout": { ... }
}
```

### Get All Workouts
```
GET /workouts
Authorization: Bearer <token>

Response 200: [ workout1, workout2, ... ]
```

### Get Specific Workout
```
GET /workouts/:id
Authorization: Bearer <token>

Response 200: { workout object }
```

### Delete Workout
```
DELETE /workouts/:id
Authorization: Bearer <token>

Response 200:
{
  "message": "Workout deleted"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid input",
  "errors": [
    {
      "param": "email",
      "msg": "Valid email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

### 500 Internal Server Error
```json
{
  "error": "Error message"
}
```