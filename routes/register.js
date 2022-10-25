const express = require("express");
const router = express.Router();
const { register, userSession } = require("../controllers/register");

//Yian Chen
router.route("/").post(register);

router.get("/", (req, res) => {
  res.status(200).redirect("/register.html");
});

router.get("/getUser", userSession);

module.exports = router;
