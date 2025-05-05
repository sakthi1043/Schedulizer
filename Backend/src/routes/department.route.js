import express from "express";
import {addDepartment,getDepartment,editDepartment,deleteDepartment} from "../controllers/department.controller.js";

const router = express.Router();

router.post('/add',addDepartment);
router.get('/',getDepartment);
router.put("/Edit/:id",editDepartment);
router.delete("/Delete/:id",deleteDepartment);

export default router;

