const express = require("express");
const router = express.Router();
const myDB = require("../db/myDB.js");
// const { getAllTracker, tracker } = require("../controllers/tracker.js");

// router.route("/tracker.html").get(getAllTracker);

router.post("/", async (req, res) => {
  console.log("params", req.body);
  const new_company = await myDB.createTracker(req.body);
  console.log("INSERT BODY", new_company);
  res.json(new_company);
});

router.get("/", async (req, res) => {
  console.log("params of get all trackers", req.body);
  const updates = await myDB.getAllTracker(req.body.company);
  console.log("updated: ", updates);
  res.json(updates);
});

// router.route("/").post(tracker);

// router.get("/", (req, res) => {
//   res.status(200).redirect("/tracker.html");
// });

module.exports = router;
