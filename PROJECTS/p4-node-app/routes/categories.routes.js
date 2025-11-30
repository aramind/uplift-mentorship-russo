import { Router } from 'express';
import requireAuth from '../middlewares/auth.middleware.js';
import {
  getCategoriesController,
  getArchivedCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateACategoryController,
  archiveCategoryController,
  restoreCategoryController,
  deleteACategoryController
} from '../controllers/categories.controller.js';
import {
  createCategoryValidation,
  updateCategoryValidation,
  validate
} from '../validators/categories.validator.js';


const categoryRouter = Router();

categoryRouter.use(requireAuth);


/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories of the current user
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     parameters:
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         description: Optional category filter
 *     responses:
 *       200:
 *         description: Categories fetched successfully.
 *       500:
 *         description: Server-side error.
 */
categoryRouter.get('/', getCategoriesController);

/**
 * @swagger
 * /api/v1/categories/archived:
 *   get:
 *     tags: [Categories]
 *     summary: Get all archived categories of the current user
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     parameters:
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *     responses:
 *       200:
 *         description: Archived categories fetched successfully.
 *       500:
 *         description: Server-side error.
 */
categoryRouter.get('/archived', getArchivedCategoriesController);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get a specific category by ID
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category fetched successfully.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Server-side error.
 */
categoryRouter.get('/:id', getCategoryByIdController);

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     tags: [Categories]
 *     summary: Create a new category for the current user
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
 *                 enum: [income, expense]
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *           example:
 *             name: Salary
 *             type: income
 *             description: Monthly salary category
 *             color: "#4CAF50"
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */
categoryRouter.post('/', createCategoryValidation, validate, createCategoryController);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   patch:
 *     tags: [Categories]
 *     summary: Update an existing category
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
 *                 enum: [income, expense]
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *           example:
 *             name: Updated Category
 *             color: "#FFAA00"
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Server-side error.
 */
categoryRouter.patch('/:id', updateCategoryValidation, validate, updateACategoryController);

/**
 * @swagger
 * /api/v1/categories/{id}/archive:
 *   patch:
 *     tags: [Categories]
 *     summary: Archive (soft delete) a category
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
 *         description: Category archived successfully.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Server-side error.
 */
categoryRouter.patch('/:id/archive', archiveCategoryController);

/**
 * @swagger
 * /api/v1/categories/{id}/restore:
 *   patch:
 *     tags: [Categories]
 *     summary: Restore an archived category
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
 *         description: Category restored successfully.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Server-side error.
 */
categoryRouter.patch('/:id/restore', restoreCategoryController);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Permanently delete a category
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
 *         description: Category deleted successfully.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Server-side error.
 */
categoryRouter.delete('/:id', deleteACategoryController);


export default categoryRouter;