//dummy list for testing
const users = [];

module.exports = class User {
  constructor(name, email, phone, password) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
  save() {
    users.push({ ...this });
    console.log("USERS", users);
    // users.push(this);
  }

  //util function not called on the instance, to fecth user data
  static fetchUser() {
    //will come back later to figure out logistics
    return users;
  }
};
