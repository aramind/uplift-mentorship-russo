import Category from '../models/Category.js';

/* 
  ENDPOINTS:
  GET /categories
  GET /categories/archived
  GET /categories/:id
  POST /categories
  PATCH /categories/:id
  PATCH /categories/:id/archive
  PATCH /categories/:id/restore
  DELETE /categories/:id
*/

// GET /categories
const getCategoriesService = async (userId, type) => {
  let catFilter = { user: userId, isDeleted: false };

  // optional query filtering 
  if (type) {
    catFilter.type = type;
  }
  
  const category = await Category.find(catFilter);

  return category;
}

// GET /categories/archived
const getArchivedCategoriesService = async (userId, type) => {
  let catFilter = { user: userId, isDeleted: true };

  if (type) {
    catFilter.type = type;
  }

  const category = await Category.find(catFilter);

  return category;
}

// GET /categories/:id
const getCategoryByIdService = async (categoryId, userId) => {
  const catFilter = { _id: categoryId, user: userId };
  const category = await Category.findOne(catFilter);

  return category;
}

// POST /categories
const createCategoryService = async (userId, data) => {
  const catFilter = { user: userId, ...data };
  const category = await Category.create(catFilter);

  return category;
}

// PATCH /categories/:id
const updateACategoryService = async (categoryId, userId, data) => {
  const catFilter = { _id: categoryId, user: userId, isDeleted: false };
  const category = await Category.findOneAndUpdate(catFilter, data, { new: true });

  return category;
}

// PATCH /categories/:id/archive
const archiveCategoryService = async (categoryId, userId) => {
  const catFilter = { _id: categoryId, user: userId };
  const category = await Category.findOneAndUpdate(catFilter, { isDeleted: true }, { new: true });

  return category;
}

// PATCH /categories/:id/restore
const restoreCategoryService = async (categoryId, userId) => {
  const catFilter = { _id: categoryId, user: userId }
  const category = await Category.findOneAndUpdate(catFilter, { isDeleted: false }, { new: true });

  return category;
}

// DELETE /categories/:id
const deleteACategoryService = async (categoryId, userId) => {
  const catFilter = { _id: categoryId, user: userId };
  const category = await Category.findOneAndDelete(catFilter);

  return category;
}

export {
  getCategoriesService,
  getArchivedCategoriesService,
  getCategoryByIdService,
  createCategoryService,
  updateACategoryService,
  archiveCategoryService,
  restoreCategoryService,
  deleteACategoryService
};