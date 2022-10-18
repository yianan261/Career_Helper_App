const express = require("express");
const router = express.Router();
const { validateAuth, logOut } = require("../controllers/auth");

// router.route("/profile").get(validateAuth);
router.get("/profile", validateAuth);

module.exports = router;
