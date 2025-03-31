import express from 'express';
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment,
} from '../controllers/commentController';

const router = express.Router();

router.get('/comments', getAllComments);
router.get('/comments/:id', getCommentById);
router.post('/comments', createComment);
router.put('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);
export default router;
