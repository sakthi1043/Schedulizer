import express from "express";
import { addStudent,getStudent,editStudent } from "../controllers/stud.controller.js";

const router = express.Router();

router.post("/add",addStudent);
router.get("/",getStudent);
router.put("/Edit/:id",editStudent);

export default router;

