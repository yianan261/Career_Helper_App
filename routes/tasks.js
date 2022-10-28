const express = require("express");
const router = express.Router();

const { getTasks, getTasksId } = require("../controllers/tasks.js");

router.route("/").get(getTasks);
router.route("/:id").get(getTasksId);

// router.get("/", getTasks);

module.exports = router;
