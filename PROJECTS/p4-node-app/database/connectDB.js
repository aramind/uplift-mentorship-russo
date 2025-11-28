import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Database!');
  } catch (err) {
    console.error('Error connecting to database: ', err);
  }
}

export default connectDB;