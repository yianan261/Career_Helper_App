const myDB = require("../db/myDB.js");

//Yian Chen
//authenticate user function, checks in DB and checks user session
const authenticateUser = async (req, res) => {
  const user = req.body;
  const checkEmail = await myDB.authenticate(user);
  if (checkEmail) {
    //if authenticated, user in session
    req.session.user = { user: user.email };
    res.status(200).json({ isLoggedIn: true, err: null });
  } else {
    req.session.user = null;
    res.status(403).json({
      isLoggedIn: false,
      err: "Wrong email ID or wrong pasword, please try again",
    });
  }
};

//function that logs out user
const logOut = (req, res) => {
  req.session.user = null;
  console.log("session logout", req.session.user);
  res.json({ isLoggedIn: false, msg: "Logged out successfully" });
};

module.exports = { authenticateUser, logOut };
