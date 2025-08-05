import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reminderTime: { type: Date, required: true } // <-- add this
});

export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
