const btn = document.getElementById("submitBtn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector(".loginForm");
const mongoDBConnection = require("../config/db");

/**
 *
 * @param {event form} form
 * @param {Map} fieldsMap - key,value pair of user login(email) and passwords
 * @returns logs object that contains username and password
 */
const loginFunc = (form, fieldsMap) => {
  const logs = {};
  logs.form = form;
  logs.fieldsMap = fieldsMap;
  console.log("LOGS1", logs);
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.log("SUCCESS");
  });

  //set values for the fields keys
  for (const key of logs.fieldsMap.keys()) {
    console.log(key);
    const input = document.querySelector(`#${key}`);
    console.log(input.value);
    logs.fieldsMap.set(`${key}`, input.value);
  }
  return logs;
};

const findUser = async (_email) => {
  const cursor = users.find({ email: _email });
  const value = await cursor.toArray();
  console.log(value);
  //returns password to match to login password of user
};

//validates username and password input and stores session in localStorage
if (form) {
  const fieldsMap = new Map();
  fieldsMap.set("email", "");
  fieldsMap.set("password", "");
  btn.addEventListener("click", (evt) => {
    if (email.value.trim() == "" || password.value.trim() == "") {
      alert("Please enter correct email and password");
    } else if (password.value !== findUser(email.value)) {
    } else {
      //add validating function later
      const credentials = loginFunc(form, fieldsMap);
      localStorage.setItem("auth", 1);
      console.log("LOGS", credentials);
    }
  });
}
