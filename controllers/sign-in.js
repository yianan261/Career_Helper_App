const path = require("path");
const { cursorTo } = require("readline");
const mongoDBConnection = require("../config/db");

const findUser = async () => {
  const cursor = users.find({ email: "ychen151@nyit.edu" });
  const value = await cursor.toArray();
  console.log(value);
};

const signIn = (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "views", "sign-in.html"));
};

module.exports = signIn;
