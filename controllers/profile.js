import myDB from "../db/myDB.js";

//Yian Chen

/**
 * function that updates user profile
 * @param {obj} req
 * @param {obj} res
 */
export const updateProfile = async (req, res) => {
  const userProfile = req.body;
  try {
    await myDB.updateProfile(userProfile.email, userProfile);
    res.status(200).json({ data: userProfile, message: "Profile saved" });
  } catch (err) {
    console.error(err);
    res.status(400).send({ err: `There was an error ${err}` });
  }
};

/**
 * function that gets user profile for the edit-profile page
 * @param {obj} req 
 * @param {obj} res 
 * 
 */
export const editProfile = async (req, res) => {
  console.log("req.session.user", req.session.user);
  if (req.session.user) {
    const sessionUser = req.session.user;
    const user_info = await myDB.getUser(sessionUser.user);
    if (!user_info.profile) {
      return res.status(200).json({ data: user_info });
    } else if (user_info.profile) {
      const user = await myDB.getUserProfile(sessionUser.user);
      res.status(200).json({ data: user.profile, msg: "successful" });
    }
  } else {
    res.redirect("/sign-in");
  }
};
