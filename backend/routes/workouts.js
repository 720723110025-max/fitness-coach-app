const express = require('express');
const jwt = require('jsonwebtoken');
const Workout = require('../models/Workout');

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.post('/', verifyToken, async (req, res) => {
  try {
    const { exerciseName, reps, sets, duration, calories, difficulty, notes } = req.body;
    const workout = new Workout({
      userId: req.userId,
      exerciseName,
      reps,
      sets,
      duration,
      calories,
      difficulty,
      notes,
    });
    await workout.save();
    res.status(201).json({ message: 'Workout saved', workout });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userId }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout || workout.userId.toString() !== req.userId) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout || workout.userId.toString() !== req.userId) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;