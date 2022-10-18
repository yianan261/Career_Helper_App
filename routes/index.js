const express = require("express");
const router = require("../routes/tasks");
const router = express.Router();
const path = require("path");

router.get("/", (req, res, send) => {
  res.status(200).sendFile(path.join(__dirname, "../", "views", "index.html"));
});

module.exports = router;
