import { authMiddleware } from "../middleware/authMiddleware";
import express from "express";
import {
  getUserRatings,
  getAllRatings,
  getRatingById,
  createRating,
  updateRating,
  deleteRating,
} from "../controllers/ratingController";

const router = express.Router();

router.get("/ratings", authMiddleware, getAllRatings);
router.get("/ratings/mine", authMiddleware, getUserRatings);
router.post("/ratings", authMiddleware, createRating);
router.put("/ratings/:id", authMiddleware, updateRating);
router.delete("/ratings/:id", authMiddleware, deleteRating);

export default router;
