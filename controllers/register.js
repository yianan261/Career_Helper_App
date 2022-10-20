const path = require("path");
const User = require("../models/users");

const register = (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "views", "register.html"));
};

const createUser = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const user = new User(name, email, phone);
  user.save();
  res.send(`user with the name ${name} added to DB!`);
};

module.exports = { register, createUser };
