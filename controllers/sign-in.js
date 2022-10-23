const path = require("path");

//Yian Chen
const signIn = (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "views", "sign-in.html"));
};

module.exports = signIn;
