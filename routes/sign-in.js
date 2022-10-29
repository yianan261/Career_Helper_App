const express = require("express");
const router = express.Router();
// const authenticate = require("../controllers/sign-in.js");
const myDB = require("../db/myDB.js");

//Yian Chen

router.get("/getUser", (req, res) => {
  console.log("get current User", req.session);
  res.json({ isLoggedIn: !!req.session.user, user: req.session });
});

router.post("/", async (req, res) => {
  //Todo: validate user data with DB
  const user = req.body;
  const checkEmail = await myDB.authenticate(user);
  if (checkEmail) {
    //if authenticated, user in session
    req.session.user = { user: user.email };
    res.status(200).json({ isLoggedIn: true, err: null });
  } else {
    req.session.user = null;
    res.status(403).json({
      isLoggedIn: false,
      err: "Wrong email ID or wrong pasword, please try again",
    });
  }
});

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

router.get("/logout", (req, res) => {
  req.session.user = null;
  console.log("session logout", req.session.user);
  res.json({ isLoggedIn: false, msg: "Logged out successfully" });
});

router.get("/", (req, res) => {
  res.status(200).redirect("/sign-in.html");
});

// router.get("/?msg=error_authenticating", (req, res) => {
//   res.status(401).redirect("/sign-in.html");
// });

// router.get("/getUser", (req, res) => {
//   res.json({ user: req.session.user });
// });

module.exports = router;
