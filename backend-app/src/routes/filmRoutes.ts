import express from "express";
import { getAll } from "../controllers/filmController";

const router = express.Router();
router.get("/films", getAll);

export default router;
