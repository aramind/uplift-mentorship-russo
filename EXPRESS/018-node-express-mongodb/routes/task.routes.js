import express from 'express';
import {
  getAllTasks,
  createNewTask,
  updateTaskById,
  deleteTaskById,
} from '../controllers/task.controller.js';

const router = express.Router();


router.get('/', getAllTasks);
router.post('/', createNewTask);
router.delete('/:id', deleteTaskById);
router.patch('/:id', updateTaskById);

export default router;
