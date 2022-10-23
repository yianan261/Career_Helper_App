const myDB = require("../db/myDB");

//Yian Chen
const register = async (req, res) => {
  console.log("POST register", req.body);
  let user;
  user = req.body;
  try {
    await myDB.createUser(user);
    return res.status(201).redirect("/sign-in.html");
  } catch (err) {
    console.error("error", err);
    res.status(400).send({ err: err });
  }
};

module.exports = register;
