import { Router } from 'express';
import requireAuth from '../middlewares/auth.middleware.js';
import {
  getAllAccsController,
  getArchivedAccsController,
  getAccByIdController,
  makeAccController,
  updateAccByIdController,
  archiveAccController,
  restoreAccController,
  deleteAccController 
} from '../controllers/accounts.controller.js';
import {
  createAccountValidation,
  updateAccountValidation,
  validate
} from '../validators/accounts.validator.js';


const accountsRouter = Router();

accountsRouter.use(requireAuth);

/**
 * @swagger
 * /api/v1/accounts:
 *   get:
 *     tags: [Accounts]
 *     summary: Get all non-archived accounts of the current user
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     responses:
 *       200:
 *         description: Accounts fetched successfully.
 *       500:
 *         description: Server-side error.
 */
accountsRouter.get('/', getAllAccsController);

/**
 * @swagger
 * /api/v1/accounts/archived:
 *   get:
 *     tags: [Accounts]
 *     summary: Get all archived accounts of the current user
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     responses:
 *       200:
 *         description: Archived accounts fetched successfully.
 *       500:
 *         description: Server-side error.
 */
accountsRouter.get('/archived', getArchivedAccsController);

/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   get:
 *     tags: [Accounts]
 *     summary: Get a specific account of the current user
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: MongoDB ObjectId of the account
 *     responses:
 *       200:
 *         description: Account fetched successfully.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Server-side error.
 */
accountsRouter.get('/:id', getAccByIdController);

/**
 * @swagger
 * /api/v1/accounts:
 *   post:
 *     tags: [Accounts]
 *     summary: Create a new account for the current user
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
 *               - name
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [cash, bank, credit, ewallet]
 *               balance:
 *                 type: number
 *                 default: 0
 *           example:
 *             name: BDO Savings
 *             type: bank
 *             balance: 5000
 *     responses:
 *       201:
 *         description: Account created successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */
accountsRouter.post('/', createAccountValidation, validate, makeAccController);

/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   patch:
 *     tags: [Accounts]
 *     summary: Update an account of the current user
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
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [cash, bank, credit, ewallet]
 *               balance:
 *                 type: number
 *           example:
 *             name: Updated Account Name
 *             type: credit
 *             balance: 3000
 *     responses:
 *       200:
 *         description: Account updated successfully.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Server-side error.
 */
accountsRouter.patch('/:id', updateAccountValidation, validate, updateAccByIdController);

/**
 * @swagger
 * /api/v1/accounts/{id}/archive:
 *   patch:
 *     tags: [Accounts]
 *     summary: Archive (soft delete) an account of the current user
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
 *         description: Account archived successfully.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Server-side error.
 */
accountsRouter.patch('/:id/archive', archiveAccController);

/**
 * @swagger
 * /api/v1/accounts/{id}/restore:
 *   patch:
 *     tags: [Accounts]
 *     summary: Restore an archived account of the current user
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
 *         description: Account restored successfully.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Server-side error.
 */
accountsRouter.patch('/:id/restore', restoreAccController);

/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   delete:
 *     tags: [Accounts]
 *     summary: Permanently delete an account of the current user
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
 *         description: Account deleted successfully.
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Server-side error.
 */
accountsRouter.delete('/:id', deleteAccController);

export default accountsRouter;

