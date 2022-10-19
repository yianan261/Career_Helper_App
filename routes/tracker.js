const express = require("express");
const router = express.Router();
const tracker = require("../controllers/tracker");

router.get("/", tracker);

module.exports = router;
