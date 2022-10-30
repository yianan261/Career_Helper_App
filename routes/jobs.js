import express from "express";
const router = express.Router();
import myDB from "../db/myDB.js";

//Yian Chen
router.get("/display-jobs", async (req, res) => {
  try {
    const page = req.query.page || 0;
    const posts = await myDB.getPosts({}, page);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(404).json({ msg: "There is an error" });
  }
});

router.get("/", (req, res) => {
  res.status(200).redirect("./jobs.html");
});
export default router;
