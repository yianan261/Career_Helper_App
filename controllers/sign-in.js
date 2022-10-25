const myDB = require("../db/myDB");

//Yian Chen
const authenticate = async (req, res) => {
  const user = req.body;
  console.log("User", user);
  //check if we password matches db password
  if (await myDB.authenticate(user)) {
    req.session.user = user.email;
    res.redirect("/?msg=authenticated");
  } else {
    res.redirect("/?msg=error_authenticating");
  }
};
module.exports = authenticate;
