// So Man Amanda Au-Yeung
import express from "express";
let router = express.Router();
import myDB from "../db/myDB.js";

router.post("/", async (req, res) => {
  console.log("params", req.body);
  const user = req.session.user;
  if (!req.session.user) {
    return res.json({
      isLoggedIn: false,
      err: "Please log in!",
    });
  } else {
    const new_company = await myDB.createTracker(req.body, user.user);
    console.log("INSERT BODY", new_company);
    res.json(new_company);
  }
});

router.get("/", async (req, res) => {
  console.log("params of get all trackers", req.body);
  const user = req.session.user;
  if (!req.session.user) {
    return res.json({
      isLoggedIn: false,
      err: "Please log in!",
    });
  } else {
    const result = await myDB.getAllTracker(user.user);
    res.status(200).json({ result });
  }
});

export default router;