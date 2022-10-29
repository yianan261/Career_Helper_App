import express from "express";
import { authenticateUser, logOut } from "../controllers/sign-in.js";
const router = express.Router();


//Yian Chen

router.get("/getUser", (req, res) => {
  console.log("get current User", req.session);
  res.json({ isLoggedIn: !!req.session.user, user: req.session });
});

router.post("/", authenticateUser);

//Test profile
router.get("/getUserProfile", async (req, res) => {
  //if no one is logged in (no one in session)
  if (!req.session.user) {
    //return here so code doesn't keep running
    return res.json({
      isLoggedIn: false,
      err: "Not authenticated, please log in",
    });
  } else {
    return res.json({ isLoggedIn: true });
  }
});

router.get("/logout", logOut);

router.get("/", (req, res) => {
  res.status(200).redirect("/sign-in.html");
});

export default router;
