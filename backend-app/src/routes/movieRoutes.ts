import express from "express";
import {
  createMovie,
  deleteMovie,
  getAll,
  getMovieById,
  updateMovie,
} from "../controllers/movieController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/movies", authMiddleware, getAll);
router.get("/movies/:id", authMiddleware, getMovieById);
router.post("/movies", authMiddleware, createMovie);
router.put("/movies/:id", authMiddleware, updateMovie);
router.delete("/movies/:id", authMiddleware, deleteMovie);

export default router;
