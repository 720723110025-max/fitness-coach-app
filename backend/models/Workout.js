const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  exerciseName: {
    type: String,
    required: true,
  },
  reps: Number,
  sets: Number,
  duration: Number,
  calories: Number,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  notes: String,
});

module.exports = mongoose.model('Workout', workoutSchema);