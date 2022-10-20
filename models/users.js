const { v4: uuidv4 } = require("uuid");
//dummy list for testing
const users = [];

module.exports = class User {
  constructor(name, email, phoneNumber) {
    this.name = name;
    this._id = uuidv4();
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
  save() {
    users.push({ ...this });
    console.log(users);
    // users.push(this);
  }

  //util function not called on the instance, to fecth user data
  static fetchUser() {
    //will come back later to figure out logistics
    return users;
  }
};
