import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required!'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Email required!'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password required!'],

  },
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const hash = await bcrypt.hash(this.password, 13);
  this.password = hash;
})

const User = mongoose.model('User', userSchema);

export default User;

