const express = require("express");
const router = express.Router();
// const { register, createUser } = require("../controllers/register");
const myDB = require("../db/myDB");

//Yian Chen
router.post("/", async (req, res) => {
  const user = req.body;
  //check if we password matches db password
  if (await myDB.authenticate(user)) {
    req.session.user = user.email;
    res.redirect("/?msg=authenticated");
  } else {
    res.redirect("/?msg=error_authenticating");
  }
});

router.get("/", (req, res) => {
  res.status(200).redirect("/sign-in.html");
});

module.exports = router;
