import {
  getCategoriesService,
  getArchivedCategoriesService,
  getCategoryByIdService,
  createCategoryService,
  updateACategoryService,
  archiveCategoryService,
  restoreCategoryService,
  deleteACategoryService
} from '../services/categories.service.js';


// GET /categories
const getCategoriesController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type } = req.query;
    const category = await getCategoriesService(userId, type);

    const responseObj = {
      success: true,
      message: 'Fetched categories successfully!',
      data: category,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// GET /categories/archived
const getArchivedCategoriesController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type } = req.query;
    const category = await getArchivedCategoriesService(userId, type);

    const responseObj = {
      success: true,
      message: 'Fetched archived categories successfully!',
      data: category,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// GET /categories/:id
const getCategoryByIdController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const userId = req.user._id;
    const category = await getCategoryByIdService(categoryId, userId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found!',
      })
    }

    const responseObj = {
      success: true,
      message: 'Fetched the category successfully!',
      data: category,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// POST /categories
const createCategoryController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, type, description, color } = req.body;

    const category = await createCategoryService(userId, { name, type, description, color });

    const responseObj = {
      success: true,
      message: 'Created a category successfully!',
      data: category,
    };

    res.status(201).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

//PATCH /categories/:id
const updateACategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const userId = req.user._id;
    const { name, type, description , color } = req.body;

    const category = await updateACategoryService(categoryId, userId, { name, type, description, color });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found!',
      })
    }
    
    const responseObj = {
      success: true,
      message: 'Updated a category successfully!',
      data: category,
    }

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// PATCH /categories/:id/archive
const archiveCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const userId = req.user._id;

    const category = await archiveCategoryService(categoryId, userId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found!',
      })
    }

    const responseObj = {
      success: true,
      message: 'Category archived successfully',
      data: category,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// PATCH /categories/:id/restore
const restoreCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const userId = req.user._id;

    const category = await restoreCategoryService(categoryId, userId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found!',
      })
    }

    const responseObj = {
      success: true,
      message: 'Category restored successfully!',
      data: category,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// DELETE /categories/:id
const deleteACategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const userId = req.user._id;

    const category = await deleteACategoryService(categoryId, userId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found!',
      });
    }

    const responseObj = {
      success: true, 
      message: 'Category deleted successfully!',
      data: category,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

export {
  getCategoriesController,
  getArchivedCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateACategoryController,
  archiveCategoryController,
  restoreCategoryController,
  deleteACategoryController
};