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
      // if (!user_email.profile) {
      //   return res.status(200).json({ data: user_email });
      // } else {
      const new_company = await myDB.createTracker(req.body, user_email.user);
      console.log("post new_company: ", new_company);
      // return res.json({ new_company: new_company, email: user_email.user });
      
      // }
    } else {
      res.redirect("/sign-in");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: `There was an error ${err}` });
  }
});

// router.post("/", createTracker);

// necessary for redirecting to the tracker.html page
router.get("/", (req, res) => {
  res.status(200).redirect("/tracker.html");
});

router.get("/", async (req, res) => {
  console.log("params get session user", req.session.user);
  if (req.session.user) {
    const userSession = req.session.user;
    console.log("get -- userSession", userSession);
    const user_email = await myDB.getUser(userSession.user);
    if (!user_email.profile) {
      return res.status(200).json({ data: user_email });
    } else {
      const new_company = await myDB.getAllTracker(user_email.user);
      res.status(200).json({ companies: new_company, email: user_email.user });
    }
  } else {
    res.redirect("/sign-in");
  }
});

export default router;
