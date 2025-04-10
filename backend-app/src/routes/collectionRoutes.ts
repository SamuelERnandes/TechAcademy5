import express from 'express';
import {
  createCollection,
  deleteCollection,
  getAll,
  getCollectionById,
  updateCollection,
} from '../controllers/collectionController';

const router = express.Router();
router.get('/users/:id/collections', getAll);
router.get('/users/:id/collections/:collectionId', getCollectionById);
router.post('/users/:id/collections', createCollection);
router.put('/users/:id/collections/:collectionId', updateCollection);
router.delete('/users/:id/collections/:collectionId', deleteCollection);

export default router;
