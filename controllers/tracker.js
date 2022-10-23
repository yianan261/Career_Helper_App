const path = require("path");

//Yian Chen
const tracker = (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "views", "tracker.html"));
};

module.exports = tracker;
