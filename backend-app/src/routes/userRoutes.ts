import express from 'express';
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
} from '../controllers/userController';

import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/users', createUser);

router.get('/users', authMiddleware, getAll);
router.get('/users/:id', authMiddleware, getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUserById);

export default router;
