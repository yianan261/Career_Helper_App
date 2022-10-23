const express = require("express");
const router = express.Router();
const { profile, editProfile } = require("../controllers/profile");

//Yian Chen
router.get("/", profile);
router.get("/edit-profile", editProfile);

//redirect users to correct routes after clicking edit-profile
router.get("/home", (req, res) => {
  res.status(200).redirect("/");
});
router.get("/tracker", (req, res) => {
  res.status(200).redirect("/tracker");
});
router.get("/jobs", (req, res) => {
  res.status(200).redirect("/jobs");
});

module.exports = router;
