import myDB from "../db/myDB.js";

//Yian Chen

/**
 * function that shows all the jobs from the database
 * @param {obj} req
 * @param {obj} res
 */
export const displayJobs = async (req, res) => {
  try {
    const page = req.query.page || 0;
    const posts = await myDB.getPosts({}, page);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(404).json({ msg: "There is an error" });
  }
};

/**
 * function that lets users search jobs through keywords
 * @param {obj} req
 * @param {obj} res
 */
export const searchJob = async (req, res) => {
  /*As you did in the function above, it's generally good practice
    to place the body of the function in a try-catch block. That
    said, great job, Yian, providing a description for the function*/
  const keywords = req.body.query;
  const getPosts = await myDB.findJobPosts(keywords);
  res.status(200).json({ data: getPosts });
};
