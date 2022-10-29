import express from "express";
import { updateProfile } from "../controllers/profile.js";
const router = express.Router();
//Yian Chen
router.get("/", (req, res) => {
  res.status(200).redirect("/profile.html");
});

router.get("/edit-profile", (req, res) => {
  res.status(200).redirect("/edit-profile.html");
});

router.post("/edit-profile", updateProfile);

export default router;
