import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Category name required!'],
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Category type required!'],
  },
  description: {
    type: String,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Category = mongoose.model('Category', categoriesSchema);

export default Category;