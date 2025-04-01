import express from 'express';
import {
  getAllRatings,
  getRatingById,
  createRating,
  updateRating,
  deleteRating,
} from '../controllers/ratingController';

const router = express.Router();

router.get('/ratings', getAllRatings);
router.get('/ratings/:id', getRatingById);
router.post('/ratings', createRating);
router.put('/ratings/:id', updateRating);
router.delete('/ratings/:id', deleteRating);

export default router;
