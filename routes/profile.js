const express = require("express");
const router = express.Router();
const { profile, editProfile } = require("../controllers/profile");

router.get("/", profile);
router.get("/:edit-profile", editProfile);
module.exports = router;
