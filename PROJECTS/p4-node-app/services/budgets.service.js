import Budget from '../models/Budget.js';
import Category from '../models/Category.js';

/*
  ENDPOINTS (services):
  GET /budgets
  GET /budgets/archived
  GET /budgets/:id
  POST /budgets
  PATCH /budgets/:id
  PATCH /budgets/:id/archive
  PATCH /budgets/:id/restore
  DELETE /budgets/:id
*/

// GET /budgets
const getBudgetsService = async (userId, type) => {
  const filter = { user: userId, isDeleted: false };
  const budgets = await Budget.find(filter).populate('category');

  if (type) {
    return budgets.filter(b => b.category && b.category.type === type);
  }

  return budgets;
};

// GET /budgets/archived
const getArchivedBudgetsService = async (userId, type) => {
  const filter = { user: userId, isDeleted: true };
  const budgets = await Budget.find(filter).populate('category');

  if (type) {
    return budgets.filter(b => b.category && b.category.type === type);
  }

  return budgets;
};

// GET /budgets/:id
const getBudgetByIdService = async (budgetId, userId) => {
  const filter = { _id: budgetId, user: userId };
  const budget = await Budget.findOne(filter).populate('category');

  return budget;
};

// POST /budgets
const createBudgetService = async (userId, data) => {
  const { category, amount, period, startDate } = data;

  const categoryFilter = { _id: category, user: userId, isDeleted: false };
  const foundCategory = await Category.findOne(categoryFilter);
  if (!foundCategory) {
    throw new Error('Invalid or unauthorized category!');
  }

  const newBudget = { user: userId, category, amount, period, startDate };

  const budget = await Budget.create(newBudget);
  
  return budget;
};

// PATCH /budgets/:id
const updateBudgetService = async (budgetId, userId, data) => {
  const filter = { _id: budgetId, user: userId, isDeleted: false };

  const existing = await Budget.findOne(filter);
  if (!existing) {
    return null;
  }

  // if category is being updated, validate ownership and type
  if (data.category) {
    const categoryFilter = { _id: data.category, user: userId, isDeleted: false };
    const foundCategory = await Category.findOne(categoryFilter);
    if (!foundCategory) {
      throw new Error('Invalid or unauthorized category!');
    }
  }

  const budget = await Budget.findOneAndUpdate(filter, data, { new: true }).populate('category');
  
  return budget;
};

// PATCH /budgets/:id/archive 
const archiveBudgetService = async (budgetId, userId) => {
  const filter = { _id: budgetId, user: userId };
  const budget = await Budget.findOneAndUpdate(filter, { isDeleted: true }, { new: true });

  return budget;
};

// PATCH /budgets/:id/restore
const restoreBudgetService = async (budgetId, userId) => {
  const filter = { _id: budgetId, user: userId, isDeleted: true };
  const budget = await Budget.findOneAndUpdate(filter, { isDeleted: false }, { new: true });

  return budget;
};

// DELETE /budgets/:id 
const deleteBudgetService = async (budgetId, userId) => {
  const filter = { _id: budgetId, user: userId };
  const budget = await Budget.findOneAndDelete(filter);

  return budget;
};

export {
  getBudgetsService,
  getArchivedBudgetsService,
  getBudgetByIdService,
  createBudgetService,
  updateBudgetService,
  archiveBudgetService,
  restoreBudgetService,
  deleteBudgetService,
};