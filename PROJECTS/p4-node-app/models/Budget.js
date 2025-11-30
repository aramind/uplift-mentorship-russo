import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  amount: {
  type: Number,
  required: [true, 'Amount required!'],
  min: [1, 'Amount must be greater than 0!'],
  },
  period: {
    type: String,
    enum: ['weekly', 'monthly', 'yearly'],
    required: [true, 'Time period required!'],
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;