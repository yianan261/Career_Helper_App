// So Man Amanda Au-Yeung
import express from "express";
let router = express.Router();
import myDB from "../db/myDB.js";

router.post("/", async (req, res) => {
  console.log("test post for createTracker in router: ", req.body);
  try {
    console.log("post req.session.user", req.session.user);
    if (req.session.user) {
      console.log("post create tracker: ", req.session.user);
      const userSession = req.session.user;
      const user_email = await myDB.getUser(userSession.user);
      console.log("post router tracker user_email: ", user_email);
      const new_company = await myDB.createTracker(req.body, user_email.email);
      console.log("post new_company: ", new_company);
      res.status(200).send("success");
    } else {
      res.redirect("/sign-in");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: `There was an error ${err}` });
  }
});


// necessary for redirecting to the tracker.html page
router.get("/", (req, res) => {
  res.status(200).redirect("/tracker.html");
});

router.get("/get-tracker", async (req, res) => {
  console.log("params get session user", req.session.user);
  if (req.session.user) {
    const userSession = req.session.user;
    console.log("get -- userSession", userSession);
    const user_email = await myDB.getUser(userSession.user);
    const new_company = await myDB.getAllTracker(user_email.email);
    console.log("get user email,", new_company);
    res.status(200).send({ companies: new_company, email: user_email.email });
  } else {
    res.redirect("/sign-in");
  }
});

router.post("/updated-tracker", async (req, res) => {
  const userUpdates = req.body;
  try {
    if (req.session.user) {
      const userSession = req.session.user;
      const user_email = await myDB.getUser(userSession.user);
      const updateTracker = await myDB.updateTracker(user_email.email, userUpdates);
      res.status(200).send({companies: updateTracker, email: user_email.email});
    }
  } catch (err) {
    res.status(400).send({err: `There was an error ${err}`});
  }
});

export default router;
