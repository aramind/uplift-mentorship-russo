import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Account name required!'],
  },
  type: {
    type: String,
    enum: ['cash', 'bank', 'credit', 'ewallet'],
    required: [true, 'Account type required!'],
  },
  balance: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Account = mongoose.model('Account', accountSchema);

export default Account;