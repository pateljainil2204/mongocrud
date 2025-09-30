import { Router } from "express";
import {
    createTask, getallTask, getTaskbyid, updateTask, deleteTask
} from "../controller/crud.js"
import authentication from "../controller/authverify.js"

const router = Router();

router.post("/", createTask);
router.get("/", getallTask);
router.get("/:id", getTaskbyid);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;