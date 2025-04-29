import express from "express";
import {addDepartment} from "../controllers/department.controller.js";

const router = express.Router();

router.post('/add',addDepartment);

