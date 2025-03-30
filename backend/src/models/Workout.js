const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  exercises: [{
    name: String,
    sets: [{
      reps: Number,
      weight: Number,
      completed: Boolean,
    }],
    notes: String,
  }],
  duration: Number,
  notes: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Workout', workoutSchema); 