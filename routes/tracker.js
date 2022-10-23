const express = require("express");
const router = express.Router();
// const tracker = require("../controllers/tracker");

router.get("/", (req, res) => {
  res.status(200).redirect("/tracker.html");
});

module.exports = router;
