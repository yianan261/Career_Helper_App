import express from "express";
import { displayJobs, searchJob } from "../controllers/jobs.js";
const router = express.Router();

//Yian Chen
//get method that displays job posts from the DB
router.get("/display-jobs", displayJobs);

//search bar
router.post("/search", searchJob);

router.get("/", (req, res) => {
  res.status(200).redirect("./jobs.html");
});

export default router;
