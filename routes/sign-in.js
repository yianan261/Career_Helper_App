const express = require("express");
const router = express.Router();
const signIn = require("../controllers/sign-in");

// router.route("/").get(register);
router.get("/", signIn);

module.exports = router;
