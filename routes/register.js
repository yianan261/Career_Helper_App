const express = require("express");
const router = express.Router();
const register = require("../controllers/register");

//Yian Chen
router.route("/").post(register);

router.get("/", (req, res) => {
  res.redirect("/register.html");
});

module.exports = router;
