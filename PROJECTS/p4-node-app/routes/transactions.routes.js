import { Router } from 'express';
import requireAuth from '../middlewares/auth.middleware.js';
import {
  createTransactionValidation,
  updateTransactionValidation,
  validate
} from '../validators/transactions.validator.js';
import {
  getTransactionsController,
  getArchivedTransactionsController,
  getTransactionsByIdController,
  createTransactionController,
  updateTransactionByIdController,
  archiveTransactionController,
  restoreTransactionController,
  deleteTransactionController
} from '../controllers/transactions.controller.js';

const txRouter = Router();

txRouter.use(requireAuth);

/**
 * @swagger
 * /api/v1/transactions:
 *   get:
 *     tags: [Transactions]
 *     summary: Get all non-archived transactions of the current user
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         description: Optional filter by transaction type
 *     responses:
 *       200:
 *         description: Transactions fetched successfully.
 *       500:
 *         description: Server-side error.
 */
txRouter.get('/', getTransactionsController);

/**
 * @swagger
 * /api/v1/transactions/archived:
 *   get:
 *     tags: [Transactions]
 *     summary: Get all archived transactions of the current user
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         description: Optional filter by transaction type
 *     responses:
 *       200:
 *         description: Archived transactions fetched successfully.
 *       500:
 *         description: Server-side error.
 */
txRouter.get('/archived', getArchivedTransactionsController);

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   get:
 *     tags: [Transactions]
 *     summary: Get a specific transaction by ID
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: MongoDB ObjectId of the transaction
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction fetched successfully.
 *       404:
 *         description: Transaction not found.
 *       500:
 *         description: Server-side error.
 */
txRouter.get('/:id', getTransactionsByIdController);

/**
 * @swagger
 * /api/v1/transactions:
 *   post:
 *     tags: [Transactions]
 *     summary: Create a new transaction for the current user
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
 *               - account
 *               - category
 *               - type
 *               - amount
 *             properties:
 *               account:
 *                 type: string
 *                 description: MongoDB ObjectId of the account
 *               category:
 *                 type: string
 *                 description: MongoDB ObjectId of the category
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *           example:
 *             account: "65d2c9e04bb13232eaf8cd45"
 *             category: "65d2c9e04bb13232eaf8cd99"
 *             type: income
 *             amount: 12000
 *             description: Salary for February
 *             date: "2025-02-01"
 *     responses:
 *       201:
 *         description: Transaction created successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */
txRouter.post('/', createTransactionValidation, validate, createTransactionController);

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   patch:
 *     tags: [Transactions]
 *     summary: Update a transaction
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: MongoDB ObjectId of the transaction
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account:
 *                 type: string
 *               category:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *           example:
 *             amount: 13500
 *             description: Updated salary amount
 *     responses:
 *       200:
 *         description: Transaction updated successfully.
 *       404:
 *         description: Transaction not found.
 *       500:
 *         description: Server-side error.
 */
txRouter.patch('/:id', updateTransactionValidation, validate, updateTransactionByIdController);

/**
 * @swagger
 * /api/v1/transactions/{id}/archive:
 *   patch:
 *     tags: [Transactions]
 *     summary: Archive (soft delete) a transaction
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
 *         description: Transaction archived successfully.
 *       404:
 *         description: Transaction not found.
 *       500:
 *         description: Server-side error.
 */
txRouter.patch('/:id/archive', archiveTransactionController);

/**
 * @swagger
 * /api/v1/transactions/{id}/restore:
 *   patch:
 *     tags: [Transactions]
 *     summary: Restore an archived transaction
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
 *         description: Transaction restored successfully.
 *       404:
 *         description: Transaction not found.
 *       500:
 *         description: Server-side error.
 */
txRouter.patch('/:id/restore', restoreTransactionController);

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   delete:
 *     tags: [Transactions]
 *     summary: Permanently delete a transaction
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
 *         description: Transaction deleted successfully.
 *       404:
 *         description: Transaction not found.
 *       500:
 *         description: Server-side error.
 */
txRouter.delete('/:id', deleteTransactionController);

export default txRouter;