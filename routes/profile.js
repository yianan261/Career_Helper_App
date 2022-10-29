const express = require("express");
const { updateProfile } = require("../controllers/profile.js");
const router = express.Router();
//Yian Chen
router.get("/", (req, res) => {
  res.status(200).redirect("/profile.html");
});

router.get("/edit-profile", (req, res) => {
  res.status(200).redirect("/edit-profile.html");
});

router.post("/edit-profile", updateProfile);

module.exports = router;
