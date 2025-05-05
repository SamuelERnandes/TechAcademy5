import { authMiddleware } from '../middleware/authMiddleware';
import express from 'express';
import {
  getUserRatings,
  getAllRatings,
  getRatingById,
  createRating,
  updateRating,
  deleteRating,
} from '../controllers/ratingController';

const router = express.Router();

router.get('/ratings', getAllRatings);
router.get('/ratings/mine', authMiddleware, getUserRatings);
router.post('/ratings', createRating);
router.put('/ratings/:id', updateRating);
router.delete('/ratings/:id', deleteRating);

export default router;
