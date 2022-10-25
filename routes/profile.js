const express = require("express");
const router = express.Router();
//Yian Chen
router.get("/", (req, res) => {
  res.status(200).redirect("/profile.html");
});
router.get("/edit-profile", (req, res) => {
  res.status(200).redirect("/edit-profile.html");
});



module.exports = router;
