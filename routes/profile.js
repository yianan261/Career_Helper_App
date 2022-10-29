import express from "express";
import { updateProfile } from "../controllers/profile.js";
const router = express.Router();
import myDB from "../db/myDB.js";

//Yian Chen
router.get("/", (req, res) => {
  res.status(200).redirect("/profile.html");
});

router.get("/user/edit-profile", async (req, res) => {
  console.log("req.session.user", req.session.user);
  if (req.session.user) {
    const sessionUser = req.session.user;
    console.log("session User", sessionUser);
    const user_info = await myDB.getUser(sessionUser.user);
    if (!user_info.profile) {
      return res.status(200).json({ data: user_info });
    } else if (user_info.profile) {
      const user = await myDB.getUserProfile(sessionUser.user);
      res.status(200).json({ data: user.profile, msg: "successful" });
    }
  } else {
    res.redirect("/sign-in");
  }
});

router.get("/edit-profile", (req, res) => {
  res.redirect("/edit-profile.html");
});

router.post("/edit-profile", updateProfile);

export default router;
