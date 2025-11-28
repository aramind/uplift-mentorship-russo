import Transaction from '../models/Transaction.js';
import Account from '../models/Account.js';

/* 
  ENDPOINTS:
  GET /stats/monthly/income-expense
  GET /stats/total-balance
*/

const getMonthlyIncomeExpenseService = async (userId) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const startOfMonth = new Date(year, month, 1, 0, 0, 0);
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

  const results = await Transaction.aggregate([
    {
      $match: {
        user: userId,
        isDeleted: false,
        date: { $gte: startOfMonth, $lte: endOfMonth},
      },
    },
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' }
      }
    }
  ]);

  let income = 0;
  let expense = 0;

  results.forEach(r => {
    if (r._id === 'income') {
      income = r.total;
    };

    if (r._id === 'expense') {
      expense = r.total;
    };
  });

  return { income, expense };
}


const getTotalBalanceService = async (userId) => {
  const results = await Account.aggregate([
    {
      $match: {
        user: userId,
        isDeleted: false
      }
    },
    {
      $group: {
        _id: null,
        totalBalance: { $sum: '$balance' }
      }
    }
  ]);

  let totalBalance;

  if (results.length > 0) {
    totalBalance = results[0].totalBalance;
  } else {
    totalBalance = 0;
  }

  return { totalBalance };
}

export {
  getMonthlyIncomeExpenseService,
  getTotalBalanceService,
};