const express = require("express");
const router = express.Router();
const authenticate = require("../controllers/register");

//Yian Chen
router.post("/", authenticate);

router.get("/", (req, res) => {
  res.status(200).redirect("/sign-in.html");
});

module.exports = router;
