import express from "express";
import {
  authenticateUser,
  getUserProfile,
  logOut,
} from "../controllers/sign-in.js";
const router = express.Router();

//Yian Chen
router.get("/getUser", (req, res) => {
  res.json({ isLoggedIn: !!req.session.user, user: req.session });
});

//post method, authenticates users
router.post("/", authenticateUser);

//get method, gets user profile if user is logged in
router.get("/getUserProfile", getUserProfile);

//get method, logs user out
router.get("/logout", logOut);

//redirects /sign-in route to /sign-in.html
router.get("/", (req, res) => {
  res.status(200).redirect("/sign-in.html");
});

export default router;
