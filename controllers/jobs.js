const path = require("path");

//Yian Chen
const jobs = (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "../", "views", "jobs.html"));
};

module.exports = jobs;
