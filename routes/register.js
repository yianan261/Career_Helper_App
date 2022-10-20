const express = require("express");
const router = express.Router();
const { register, createUser } = require("../controllers/register");

// router.route('/').post(createUser);
router.post("/", createUser);
router.route("/").get(register);

module.exports = router;
