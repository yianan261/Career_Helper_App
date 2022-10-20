const path = require("path");
const User = require("../models/users");

const register = (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "views", "register.html"));
};

const createUser = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const user = new User(name, email, phone, password);
  user.save();
  res.send(`user with the name ${req.body.name} added to DB!`);
};

module.exports = { register, createUser };
