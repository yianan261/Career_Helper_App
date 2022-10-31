import myDB from "../db/myDB.js";

//Yian Chen
//authenticate user function, checks in DB and checks user session
export const authenticateUser = async (req, res) => {
  const user = req.body;
  const checkEmail = await myDB.authenticate(user);
  if (checkEmail) {
    //if authenticated, user in session
    req.session.user = { user: user.email };
    res.status(200).json({ isLoggedIn: true, err: null, user: user.email });
  } else {
    req.session.user = null;
    res.status(403).json({
      isLoggedIn: false,
      err: "Wrong email ID or wrong pasword, please try again",
    });
  }
};

//function that logs out user
export const logOut = (req, res) => {
  req.session.user = null;
  res.json({ isLoggedIn: false, msg: "Logged out successfully" });
};

//function that gets the user's profile if user is authenticated
export const getUserProfile = async (req, res) => {
  //if no one is logged in (no one in session)
  if (!req.session.user) {
    //return here so code doesn't keep running
    return res.json({
      isLoggedIn: false,
      err: "Not authenticated, please log in",
    });
  } else {
    return res.json({ isLoggedIn: true });
  }
};
