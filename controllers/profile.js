import myDB from "../db/myDB.js";

//Yian Chen

export const updateProfile = async (req, res) => {
  const userProfile = req.body;
  try {
    const updateProfile = await myDB.updateProfile(
      userProfile.email,
      userProfile
    );
    console.log("Check if profile updated", updateProfile);
    res.status(200).json({ data: userProfile, message: "Profile saved" });
  } catch (err) {
    console.error(err);
    res.status(400).send({ err: `There was an error ${err}` });
  }
};
