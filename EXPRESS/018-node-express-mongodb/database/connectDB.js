import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB database successfully!');
  } catch (error) {
    console.error('Error connecting to database: ', error);
  }
}

export default connectDB;