const express = require("express");
const router = express.Router();
const register = require("../controllers/register");

router.route("/").get(register);

module.exports = router;
