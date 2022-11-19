import express from "express";
import { editProfile, updateProfile } from "../controllers/profile.js";
const router = express.Router();

//Yian Chen
router.get("/", (req, res) => {
  res.status(200).redirect("/profile.html");
});

//get method that gets user's edit profile page
router.get("/user/edit-profile", editProfile);
// Try to render in client side
router.get("/edit-profile", (req, res) => {
  res.redirect("/edit-profile.html");
});

//post method that lets user update profile
router.post("/edit-profile", updateProfile);

export default router;
