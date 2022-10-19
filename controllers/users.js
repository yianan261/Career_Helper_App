import { v4 as uuidv4 } from "uuid";

// let users = [
//   {
//     firstName: "John",
//     lastName: "Doe",
//     age: 25,
//   },
//   {
//     firstName: "Jane",
//     lastName: "Doe",
//     age: 27,
//   },
// ];
const createUser = (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuidv4() });
  res.send(`user with the name ${user.firstName} added to DB!`);
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
