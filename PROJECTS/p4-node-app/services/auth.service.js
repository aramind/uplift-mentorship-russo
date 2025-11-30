import bcrypt from 'bcrypt';
import User from '../models/User.js';
import generateToken from './token.service.js';


const registerUser = async (name, email, password) => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error('Email already exists!');
  }

  
  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);
  
  return { user, token };

}


const signInUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found!');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid password!');
  }

  const token = generateToken(user._id);

  return { user, token };
}


export {
  registerUser, 
  signInUser,
}