const express = require("express");
const router = express.Router();
// const authenticate = require("../controllers/sign-in.js");
const myDB = require("../db/myDB.js");

//Yian Chen
router.post("/", async (req, res) => {
  const user = req.body;
  console.log("User", user);
  //check if we password matches db password
  if (await myDB.authenticate(user)) {
    req.session.user = user.email;
    res.redirect("/profile/?msg=authenticated");
  } else {
    res.redirect("/?msg=error_authenticating");
    
  }
});

router.get("/", (req, res) => {
  res.status(200).redirect("/sign-in.html");
});

router.get("/?msg=error_authenticating", (req, res) => {
  res.status(401).redirect("/sign-in.html");
});

router.get("/getUser", (req, res) => {
  res.json({ user: req.session.user });
});

module.exports = router;
