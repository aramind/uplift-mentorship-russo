import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: [true, 'Title required!'],
  },
  description: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;