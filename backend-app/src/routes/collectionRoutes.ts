import express from "express";
import {
  createCollection,
  deleteCollection,
  getAll,
  getCollectionById,
  updateCollection,
} from "../controllers/collectionController";

const router = express.Router();
router.get("/collection", getAll);
router.get("/collection/:id", getCollectionById);
router.post("/collection", createCollection);
router.put("/collection/:id", updateCollection);
router.delete("/collection/:id", deleteCollection);

export default router;
