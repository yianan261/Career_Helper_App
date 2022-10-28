const myDB = require("../db/myDB.js");

//Yian Chen
const tracker = async (req, res) => {
  // So Man Amanda Au-Yeung
  console.log("tracker test:", req.body);
  // insert MongoDB
  await myDB.createTracker(req.body);
  res.status(201).redirect("/tracker.html");
  // test
};

// So Man Amanda Au-Yeung
const getAllTracker = async (req, res) => {
  // findAll
  const info = await myDB.getAllTracker(req.body.company);
  console.log("info", info);
  res.send(info);
  // return json
};

module.exports = { tracker, getAllTracker };
