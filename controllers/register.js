import myDB from "../db/myDB.js";

//Yian Chen
/**
 * registration function
 * checks the request body and searches DB to see if user has
 * already been registered, if so they will be asked to sign-in
 * if not new user will be created
 * @param {object} req
 * @param {object} res
 */
export const register = async (req, res) => {
  let user;
  let checker;
  try {
    user = req.body;
    checker = await myDB.getUser(user.email);
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
        res.json({ error: "User email already exists", err: "email" });
      }
    }
  } catch (err) {
    alert(`There is an error ${err}`);
    console.error("error", err);
    res.status(400).send({ err: err });
  }
};

export const userSession = (req, res) => {
  res.json({ user: req.session.user });
};
