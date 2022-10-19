const path = require("path");

const tracker = (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "views", "tracker.html"));
};

module.exports = tracker;
