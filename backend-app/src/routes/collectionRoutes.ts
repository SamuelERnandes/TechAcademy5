import express from "express";
import { getAll } from "../controllers/collectionController";

const router = express.Router();
router.get("/collection", getAll);

export default router;
