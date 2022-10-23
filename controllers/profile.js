const path = require("path");

//Yian Chen
const profile = (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "views", "profile.html"));
};

const editProfile = (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "views", "edit-profile.html"));
};

module.exports = { editProfile, profile };
