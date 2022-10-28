const myDB = require("../db/myDB.js");

//Yian Chen
const register = async (req, res) => {
  console.log("POST register", req.body);
  let user;
  let checker;
  try {
    user = req.body;
    checker = await myDB.getUser(user.email);
    console.log("Checker", user, checker);
    if (
      user.email != undefined &&
      checker === null &&
      user.password === user.confirm_password
    ) {
      await myDB.createUser(user);
      res
        .status(201)
        .json({ message: "Registration successful! Please sign-in" });
    } else {
      if (user.password !== user.confirm_password) {
        res.json({ error: "Passwords not matching", err: "password" });
      } else if (user.email === checker.email) {
        res
          .status(200)
          .json({ error: "User email already exists", err: "email" });
      }
    }
  } catch (err) {
    console.error("error", err);
    res.status(400).send({ err: err });
  }
};

const userSession = (req, res) => {
  res.json({ user: req.session.user });
};
module.exports = { register, userSession };
