const express = require("express");
const { authenticateUser, logOut } = require("../controllers/sign-in.js");
const router = express.Router();
const myDB = require("../db/myDB.js");

//Yian Chen

router.get("/getUser", (req, res) => {
  console.log("get current User", req.session);
  res.json({ isLoggedIn: !!req.session.user, user: req.session });
});

router.post("/", authenticateUser);

//Test profile
router.get("/getUserProfile", (req, res) => {
  //if no one is logged in (no one in session)
  if (!req.session.user) {
    //return here so code doesn't keep running
    return res.json({
      isLoggedIn: false,
      err: "Not authenticated, please log in",
    });
  }
  return res.json(myDB.getUserProfile(req.session.user));
});

router.get("/logout", logOut);

router.get("/", (req, res) => {
  res.status(200).redirect("/sign-in.html");
});

module.exports = router;
