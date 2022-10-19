const path = require("path");

const register = (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "views", "register.html"));
};

module.exports = register;
