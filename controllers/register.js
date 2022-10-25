const myDB = require("../db/myDB");

//Yian Chen
const register = async (req, res) => {
  console.log("POST register", req.body);
  try {
    const user = req.body;
    const checker = await myDB.getUser(user.email);
    console.log("Checker", checker);
    if (user.email != undefined && checker === null) {
      await myDB.createUser(user);
      res.status(201).redirect("/sign-in.html");
    } else {
      if (user.email === checker.email) {
        console.log("CHECKER EXISTS");
        return res.status(200).send(checker);
        // if the email is already registered
        // res.json(JSON.stringify());
        // console.log("RES", res);
        // res.send({ user: checker });
        // res.send({ checker: checker });
      }
    }
  } catch (err) {
    console.error("error", err);
    res.status(400).send({ err: err });
  }
};

module.exports = register;
