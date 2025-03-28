import express from "express";
import {
  createFilm,
  deleteFilm,
  getAll,
  getFilmById,
  updateFilm,
} from "../controllers/filmController";

const router = express.Router();
router.get("/films", getAll);
router.get("/films/:id", getFilmById);
router.post("/films", createFilm);
router.put("/films/:id", updateFilm);
router.delete("/films/:id", deleteFilm);

export default router;
