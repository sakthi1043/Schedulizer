import express from "express";
import { getAllBatches } from "../controllers/batch.controller.js";

const router = express.Router();

router.get("/", getAllBatches); // GET /api/batches

export default router;
