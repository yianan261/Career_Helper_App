import express from "express";
let router = express.Router();
import { getTasks, getTasksId } from "../controllers/tasks.js";

router.route("/").get(getTasks);
router.route("/:id").get(getTasksId);

// router.get("/", getTasks);

export default router;
