import {
  getBudgetsService,
  getArchivedBudgetsService,
  getBudgetByIdService,
  createBudgetService,
  updateBudgetService,
  archiveBudgetService,
  restoreBudgetService,
  deleteBudgetService,
} from '../services/budgets.service.js';


// GET /budgets
const getBudgetsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type } = req.query;

    const budgets = await getBudgetsService(userId, type);

    const responseObj = {
      success: true,
      message: 'Fetched all budgets successfully!',
      data: budgets,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// GET /budgets/archived
const getArchivedBudgetsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type } = req.query;

    const budgets = await getArchivedBudgetsService(userId, type);

    const responseObj = {
      success: true,
      message: 'Fetched all archived budgets successfully!',
      data: budgets,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// GET /budgets/:id
const getBudgetByIdController = async (req, res) => {
  try {
    const budgetId = req.params.id;
    const userId = req.user._id;

    const budget = await getBudgetByIdService(budgetId, userId);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: 'Budget not found!',
      });
    };

    const responseObj = {
      success: true,
      message: 'Fetched the budget successfully!',
      data: budget,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// POST /budgets
const createBudgetController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { category, amount, period, startDate } = req.body;

    const budget = await createBudgetService(userId, { category, amount, period, startDate });

    const responseObj = {
      success: true,
      message: 'Created the budget successfully!',
      data: budget,
    };

    res.status(201).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// PATCH /budgets/:id
const updateBudgetController = async (req, res) => {
  try {
    const budgetId = req.params.id;
    const userId = req.user._id;
    const { category, amount, period, startDate } = req.body;

    const budget = await updateBudgetService(budgetId, userId, { category, amount, period, startDate });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: 'Budget not found',
      })
    }

    const responseObj = {
      success: true,
      message: 'Budget successfully updated!',
      data: budget,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// PATCH /budgets/:id/archive
const archiveBudgetController = async (req, res) => {
  try {
    const budgetId = req.params.id;
    const userId = req.user._id;

    const budget = await archiveBudgetService(budgetId, userId);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: 'Budget not found!',
      });
    };

    const responseObj = {
      success: true,
      message: 'Budget successfully archived!',
      data: budget,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// PATCH /budgets/:id/restore
const restoreBudgetController = async (req, res) => {
  try {
    const budgetId = req.params.id;
    const userId = req.user._id;

    const budget = await restoreBudgetService(budgetId, userId);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: 'Budget not found!',
      });
    };

    const responseObj = {
      success: true,
      message: 'Budget successfully restored!',
      data: budget,
    };

    res.status(200).json(responseObj);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// DELETE /budgets
const deleteBudgetController = async (req, res) => {
  try {
    const budgetId = req.params.id;
    const userId = req.user._id;

    const budget = await deleteBudgetService(budgetId, userId);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: 'Budget not found!',
      });
    };

    const responseObj = {
      success: true,
      message: 'Budget successfully deleted!',
      data: budget,
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
  getBudgetsController,
  getArchivedBudgetsController,
  getBudgetByIdController,
  createBudgetController,
  updateBudgetController,
  archiveBudgetController,
  restoreBudgetController,
  deleteBudgetController
};