import express from "express";
let router = express.Router();
import { getAllTracker, tracker } from "../controllers/tracker.js";

router.route("/tracker.html").get(getAllTracker);
router.route("/").post(tracker);

router.get("/", (req, res) => {
  res.status(200).redirect("/tracker.html");
});

export default router;
