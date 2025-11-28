import { Router } from 'express';
import requireAuth from '../middlewares/auth.middleware.js';
import {
  createBudgetValidation,
  updateBudgetValidation,
  validate
} from '../validators/budgets.validator.js';
import {
  getBudgetsController,
  getArchivedBudgetsController,
  getBudgetByIdController,
  createBudgetController,
  updateBudgetController,
  archiveBudgetController,
  restoreBudgetController,
  deleteBudgetController
}from '../controllers/budgets.controller.js';

const budgetsRouter = Router();

budgetsRouter.use(requireAuth);


/**
 * @swagger
 * /api/v1/budgets:
 *   get:
 *     tags: [Budgets]
 *     summary: Get all non-archived budgets of the current user
 *     description: Requires a valid access token (cookie-based).
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         description: Optional filter by linked category type
 *     responses:
 *       200:
 *         description: Budgets fetched successfully.
 *       500:
 *         description: Server-side error.
 */
budgetsRouter.get('/', getBudgetsController);

/**
 * @swagger
 * /api/v1/budgets/archived:
 *   get:
 *     tags: [Budgets]
 *     summary: Get all archived budgets of the current user
 *     description: Requires a valid access token (cookie-based).
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *     responses:
 *       200:
 *         description: Archived budgets fetched successfully.
 *       500:
 *         description: Server-side error.
 */
budgetsRouter.get('/archived', getArchivedBudgetsController);

/**
 * @swagger
 * /api/v1/budgets/{id}:
 *   get:
 *     tags: [Budgets]
 *     summary: Get a specific budget by ID
 *     description: Requires a valid access token (cookie-based).
 *     parameters:
 *       - name: id
 *         in: path
 *         description: MongoDB ObjectId of the budget
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Budget fetched successfully.
 *       404:
 *         description: Budget not found.
 *       500:
 *         description: Server-side error.
 */
budgetsRouter.get('/:id', getBudgetByIdController);

/**
 * @swagger
 * /api/v1/budgets:
 *   post:
 *     tags: [Budgets]
 *     summary: Create a new budget for the current user
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based). User ID is derived from the token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *               - amount
 *               - period
 *             properties:
 *               category:
 *                 type: string
 *                 description: MongoDB ObjectId of a valid category
 *               amount:
 *                 type: number
 *               period:
 *                 type: string
 *                 enum: [weekly, monthly, yearly]
 *               startDate:
 *                 type: string
 *                 format: date
 *           example:
 *             category: "65d2c9e04bb13232eaf8cd12"
 *             amount: 5000
 *             period: monthly
 *             startDate: "2025-02-01"
 *     responses:
 *       201:
 *         description: Budget created successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */
budgetsRouter.post('/', createBudgetValidation, validate, createBudgetController);

/**
 * @swagger
 * /api/v1/budgets/{id}:
 *   patch:
 *     tags: [Budgets]
 *     summary: Update a budget
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               amount:
 *                 type: number
 *               period:
 *                 type: string
 *                 enum: [weekly, monthly, yearly]
 *               startDate:
 *                 type: string
 *                 format: date
 *           example:
 *             amount: 6000
 *             period: yearly
 *     responses:
 *       200:
 *         description: Budget updated successfully.
 *       404:
 *         description: Budget not found.
 *       500:
 *         description: Server-side error.
 */
budgetsRouter.patch('/:id', updateBudgetValidation, validate, updateBudgetController);

/**
 * @swagger
 * /api/v1/budgets/{id}/archive:
 *   patch:
 *     tags: [Budgets]
 *     summary: Archive (soft delete) a budget
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Budget archived successfully.
 *       404:
 *         description: Budget not found.
 *       500:
 *         description: Server-side error.
 */
budgetsRouter.patch('/:id/archive', archiveBudgetController);

/**
 * @swagger
 * /api/v1/budgets/{id}/restore:
 *   patch:
 *     tags: [Budgets]
 *     summary: Restore an archived budget
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Budget restored successfully.
 *       404:
 *         description: Budget not found.
 *       500:
 *         description: Server-side error.
 */
budgetsRouter.patch('/:id/restore', restoreBudgetController);

/**
 * @swagger
 * /api/v1/budgets/{id}:
 *   delete:
 *     tags: [Budgets]
 *     summary: Permanently delete a budget
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Budget deleted successfully.
 *       404:
 *         description: Budget not found.
 *       500:
 *         description: Server-side error.
 */
budgetsRouter.delete('/:id', deleteBudgetController);

export default budgetsRouter;