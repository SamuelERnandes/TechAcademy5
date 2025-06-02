import express from "express";
import {
  createCollection,
  deleteCollection,
  getAll,
  getCollectionById,
  updateCollection,
} from "../controllers/collectionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/users/:id/collections", authMiddleware, getAll);
router.get(
  "/users/:id/collections/:collectionId",
  authMiddleware,
  getCollectionById
);
router.post("/users/:id/collections", authMiddleware, createCollection);
router.put(
  "/users/:id/collections/:collectionId",
  authMiddleware,
  updateCollection
);
router.delete(
  "/users/:id/collections/:collectionId",
  authMiddleware,
  deleteCollection
);

export default router;
