const express = require("express");
const router = express.Router();
const {getAllTracker, tracker} = require("../controllers/tracker");

router.route("/tracker.html").get(getAllTracker);
router.route("/").post(tracker);

router.get("/", (req, res) => {
  res.status(200).redirect("/tracker.html");
});

module.exports = router;
