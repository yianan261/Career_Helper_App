const path = require("path");

const profile = (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "views", "profile.html"));
};

module.exports = profile;
