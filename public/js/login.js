const btn = document.getElementById("submitBtn");
const email = document.getElementById("email");
const password = document.getElementById("password");

const logs = {};
const form = document.querySelector(".loginForm");

/**
 *
 * @param {*} form
 * @param {*} fieldsMap
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
    const input = document.querySelector(`#${key}`);
    console.log(input.value);
    logs.fieldsMap.set(`${key}`, input.value);
  }

  return logs;
};

//validates username and password input
if (form) {
  const fieldsMap = new Map();
  fieldsMap.set("email", "");
  fieldsMap.set("password", "");
  btn.addEventListener("click", (evt) => {
    if (email.value.trim() == "" || password.value.trim() == "") {
      alert("Please enter correct email and password");
    } else {
      //add validating function later
      const credentials = loginFunc(form, fieldsMap);
      localStorage.setItem("auth", 1);
      console.log("LOGS", credentials);
    }
  });
}
