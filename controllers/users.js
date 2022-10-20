const { v4: uuidv4 } = require("uuid");
const User = require("../models/users");

const createUser = (req, res) => {
  const user = new User(
    req.body.name,
    uuidv4(),
    req.body.email,
    req.body.phone
  );
  user.save();
  res.send(`user with the name ${user.name} added to DB!`);
};

const getUser = (req, res) => {
  res.send(users);
  console.log(users);
};

const getID = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id != id);
  res.send(`User with the id ${id} is deleted`);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  const userToBeUpdated = users.find((user) => user.id === id);
  if (firstName) userToBeUpdated.firstName = firstName;
  if (lastName) userToBeUpdated.lastName = lastName;
  if (age) userToBeUpdated.age = age;
  res.send(`user with id ${id} has been updated`);
};

module.exports = { createUser, getUser, getID, deleteUser, updateUser };
