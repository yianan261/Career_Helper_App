const path = require("path");

const jobs = (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "../", "views", "jobs.html"));
};

module.exports = jobs;
