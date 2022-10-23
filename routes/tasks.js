const express = require("express");
const router = express.Router();

const { getTasks, getTasksId } = require("../controllers/tasks");

router.route("/").get(getTasks);
router.route("/:id").get(getTasksId);

// router.get("/", getTasks);

module.exports = router;
