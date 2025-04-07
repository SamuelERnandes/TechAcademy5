import express from 'express';
import {
  createMovie,
  deleteMovie,
  getAll,
  getMovieById,
  updateMovie,
} from '../controllers/movieController';

const router = express.Router();
router.get('/movies', getAll);
router.get('/movies/:id', getMovieById);
router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

export default router;
