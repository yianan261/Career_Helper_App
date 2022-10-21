const path = require("path");
const User = require("../models/users");
const mongoDBConnection = require("../config/db")

const register = (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "views", "register.html"));
};

const createUser = async (req, res) => {
    const database = mongoDBConnection.getDB();
    const userTable = database.collection("user");

  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const user = new User(name, email, phone, password)

//   const doc = {
//     name: name,
//     email: email,
//     phone: phone,
//     password: password
//   }


    const insertOneToDB = await userTable.insertOne(user);
    res.status(200).json({insertOneToDB})

//   user.save();
//   res.send(`user with the name ${req.body.name} added to DB!`);
//   res.status(200).json({msg:`user with the name ${req.body.name} added to DB!}`})
};

module.exports = { register, createUser };
