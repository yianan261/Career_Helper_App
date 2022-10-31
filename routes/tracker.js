// So Man Amanda Au-Yeung
import express from "express";
let router = express.Router();
import myDB from "../db/myDB.js";

// posting tracker to DB
router.post("/", async (req, res) => {
  try {
    if (req.session.user) {
      const userSession = req.session.user;
      const user_email = await myDB.getUser(userSession.user);
      await myDB.createTracker(req.body, user_email.email);
      res.status(200).send("success");
    } else {
      res.redirect("/sign-in");
    }
  } catch (err) {
    res.status(400).send({ err: `There was an error ${err}` });
  }
});

// necessary for redirecting to the tracker.html page
router.get("/", (req, res) => {
  res.status(200).redirect("/tracker.html");
});

// gets tracker info from DB
router.get("/get-tracker", async (req, res) => {
  if (req.session.user) {
    const userSession = req.session.user;
    const user_email = await myDB.getUser(userSession.user);
    const new_company = await myDB.getAllTracker(user_email.email);
    res.status(200).send({ companies: new_company, email: user_email.email });
  } else {
    res.redirect("/sign-in");
  }
});

// posting updates to DB
router.post("/updated-tracker", async (req, res) => {
  let id = req.query.id;
  const userUpdates = req.body;
  try {
    if (id) {
      const updateTracker = await myDB.updateTracker(id, userUpdates);
      res.status(200).send({ id: id, companies: updateTracker });
    }
  } catch (err) {
    res.status(400).send({ err: `There was an error ${err}` });
  }
});

export default router;
