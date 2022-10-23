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
    } else if (user.email != undefined && user.email === checker.email) {
      console.log("CHECKER EXISTS");
      // if the email is already registered
      // res.json(JSON.stringify());
      // console.log("RES", res);
      res.send({ user: checker });
      // res.send({ checker: checker });
    } else {
      res.status(200);
    }
  } catch (err) {
    console.error("error", err);
    res.status(400).send({ err: err });
  }
};

module.exports = register;
