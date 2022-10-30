import express from "express";
const router = express.Router();
import myDB from "../db/myDB.js";

//Yian Chen
router.get("/display-jobs", async (req, res) => {
  try {
    console.log("req.query.page", req.query.page);
    const page = req.query.page || 0;
    const posts = await myDB.getPosts({}, page);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(404).json({ msg: "There is an error" });
  }
});

//search bar
router.post("/search", async (req, res) => {
  console.log("search query", req.body.query);
  console.log("search query", req.query.query);
  const keywords = req.body.query;
  const getPosts = await myDB.findJobPosts(keywords);
  if (!getPosts) {
    res.status(204).json({ msg: "No search results" });
  } else {
    res.status(200).json({ data: getPosts });
  }
});

router.get("/", (req, res) => {
  res.status(200).redirect("./jobs.html");
});

export default router;
