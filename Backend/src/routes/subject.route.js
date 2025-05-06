import express from 'express';
import { addSubject } from "../controllers/subject.controller.js";

const router=express.Router();

router.post('/Add',addSubject);

export default router;