import express from 'express';
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
} from '../controllers/userController';

import { authMiddleware } from '../middleware/authMiddeleware';

const router = express.Router();

// rota pública
router.post('/users', createUser);

// rotas privadas
router.get('/users', authMiddleware, getAll);
router.get('/users/:id', authMiddleware, getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUserById);

export default router;
