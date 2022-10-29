
import express from "express";
let router = express.Router();
import { getAllTracker, tracker } from "../controllers/tracker.js";


// router.route("/tracker.html").get(getAllTracker);

router.post("/", async (req, res) => {
  console.log("params", req.body);
  const new_company = await myDB.createTracker(req.body);
  console.log("INSERT BODY", new_company);
  res.json(new_company);
});

router.get("/", async (req, res) => {
  const updates = await myDB.getAllTracker(req.body.company);
  console.log("updated: ", updates);
  res.json(updates);
});

// router.route("/").post(tracker);

router.get("/", (req, res) => {
  res.status(200).redirect("/tracker.html");
});

export default router;
