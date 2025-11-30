import {
  getMonthlyIncomeExpenseService,
  getTotalBalanceService
} from "../services/stats.service.js";

const getMonthlyIncomeExpenseController = async (req, res) => {
  try {
    const userId = req.user._id;

    const monthly = await getMonthlyIncomeExpenseService(userId);

    const responseObj = {
      success: true,
      message: 'Fetched your Monthly Income & Expenses successfully!',
      data: monthly,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

const getTotalBalanceController = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalBalance = await getTotalBalanceService(userId);

    const responseObj = {
      success: true,
      message: 'Fetched your total balance successfully!',
      data: totalBalance,
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
  getMonthlyIncomeExpenseController,
  getTotalBalanceController
};