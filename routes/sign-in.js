const express = require("express");
const router = express.Router();
const authenticate = require("../controllers/sign-in");

//Yian Chen
router.post("/", authenticate);

router.get("/", (req, res) => {
  res.status(200).redirect("/sign-in.html");
});

router.get("/?msg=error_authenticating", (req, res) => {
  res.status(401).redirect("/sign-in.html");
});
module.exports = router;
