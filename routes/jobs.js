const express = require("express");
const router = express.Router();
const jobs = require("../controllers/jobs");

router.get("/", jobs);
module.exports = router;
