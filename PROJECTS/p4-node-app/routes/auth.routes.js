import { Router } from 'express';
import requireAuth from '../middlewares/auth.middleware.js';

import { 
  registerValidation, 
  signInValidation, 
  validate 
} from '../validators/auth.validator.js';

import { 
  showMe, 
  register, 
  signIn, 
  signOut 
} from '../controllers/auth.controller.js';


const authRouter = Router();

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     tags: [Authentication]
 *     summary: Get the currently authenticated user
 *     security:
 *       - cookieAuth: []
 *     description: Requires a valid access token (cookie-based).
 *     responses:
 *       200:
 *         description: User info fetched successfully.
 *       401:
 *         description: Unauthorized - invalid or missing token.
 */
authRouter.get('/me', requireAuth, showMe);

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: 
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             name: Russell Ferrero
 *             email: russell@mail.com
 *             password: password123
 *     responses:
 *       201:
 *         description: Registration successful.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Server-side error.
 */
authRouter.post('/register', registerValidation, validate, register);

/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     tags: [Authentication]
 *     summary: Login user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *           example:
 *             email: russell@mail.com
 *             password: password123
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         description: Invalid credentials.
 *       500:
 *         description: Server-side error.
 */
authRouter.post('/sign-in', signInValidation, validate, signIn);

/**
 * @swagger
 * /api/v1/auth/sign-out:
 *   post:
 *     tags: [Authentication]
 *     summary: Logs out the authenticated user.
 *     responses:
 *       200:
 *         description: User signed out successfully.
 */
authRouter.post('/sign-out', signOut);

export default authRouter;
