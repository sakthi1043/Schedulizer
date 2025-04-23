import express from "express";
import { addProduct } from "../controllers/product.controller.js";
import upload from '../lib/multer.js';

const router = express.Router();

router.post('/add', upload.fields([
    { name: 'main', maxCount: 1 },  // The 'main' image field
    { name: 'hover', maxCount: 1 },  // The 'hover' image field
  ]), addProduct);


export default router;