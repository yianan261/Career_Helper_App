const express = require("express");
const router = express.Router();
const { register, createUser } = require("../controllers/register");

router.route("/").get(register);
router.post("/", createUser);

module.exports = router;
