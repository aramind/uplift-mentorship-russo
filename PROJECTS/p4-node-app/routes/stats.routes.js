import { Router } from 'express';
import requireAuth from '../middlewares/auth.middleware.js';
import {
  getMonthlyIncomeExpenseController,
  getTotalBalanceController
} from '../controllers/stats.controller.js';

const statsRouter = Router();

statsRouter.use(requireAuth);

/**
 * @swagger
 * /api/v1/stats/monthly/income-expense:
 *   get:
 *     tags: [Statistics]
 *     summary: Get the total income and expenses for the current month
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     responses:
 *       200:
 *         description: Fetched the monthly income and expense totals successfully.
 *       500:
 *         description: Server-side error.
 */
statsRouter.get('/monthly/income-expense', getMonthlyIncomeExpenseController);

/**
 * @swagger
 * /api/v1/stats/total-balance:
 *   get:
 *     tags: [Statistics]
 *     summary: Get the total balance across all accounts of the current user
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     responses:
 *       200:
 *         description: Total balance fetched successfully.
 *       500:
 *         description: Server-side error.
 */
statsRouter.get('/total-balance', getTotalBalanceController);

export default statsRouter;