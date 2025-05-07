import express from 'express';
import { addSubject,getSubject,deleteSubject,editSubject } from "../controllers/subject.controller.js";

const router=express.Router();

router.post('/Add',addSubject);
router.get('/',getSubject);
router.delete("/Delete/:id",deleteSubject);
router.put("/Edit/:id",editSubject);

export default router;