const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  getID,
  deleteUser,
  updateUser,
} = require("..//controllers/tasks");

// router.route('/').get(getTasks);
// router.route('/:id').get(getTasksId);
router.get("/", getUser);

router.post("/", createUser);

//params in route;
router.get("/:id", getID);

//delete
router.delete("/:id", deleteUser);

//update
router.patch("/:id", updateUser);
module.exports = router;
