//Yian Chen
//Login authentication module
function Login() {
  const checkForErrors = () => {
    // From  https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    console.log("urlParams", params.msg);
    if (params.msg) {
      console.log("logged");
    }
  };
  const isLoggedIn = async () => {
    const res = await fetch("/getUser");
    const user = await res.json();
    if (user.email) {
      console.log("authenticated!");
    }
    return user.email !== undefined;
  };

  checkForErrors();
  isLoggedIn();
  //test
}
Login();
// const btn = document.getElementById("submitBtn");
// const email = document.getElementById("email");
// const password = document.getElementById("password");
// const form = document.querySelector(".loginForm");
// const mongoDBConnection = require("../config/db");

// /**
//  *
//  * @param {event form} form
//  * @param {Map} fieldsMap - key,value pair of user login(email) and passwords
//  * @returns logs object that contains username and password
//  */
// const loginFunc = (form, fieldsMap) => {
//   const logs = {};
//   logs.form = form;
//   logs.fieldsMap = fieldsMap;
//   console.log("LOGS1", logs);
//   form.addEventListener("submit", (evt) => {
//     evt.preventDefault();
//     console.log("SUCCESS");
//   });

//   //set values for the fields keys
//   for (const key of logs.fieldsMap.keys()) {
//     console.log(key);
//     const input = document.querySelector(`#${key}`);
//     console.log(input.value);
//     logs.fieldsMap.set(`${key}`, input.value);
//   }
//   return logs;
// };

// //validates username and password input and stores session in localStorage
// if (form) {
//   const fieldsMap = new Map();
//   fieldsMap.set("email", "");
//   fieldsMap.set("password", "");
//   btn.addEventListener("click", (evt) => {
//     if (email.value.trim() == "" || password.value.trim() == "") {
//       alert("Please enter correct email and password");
//     } else if (password.value !== findUser(email.value)) {
//     } else {
//       //add validating function later
//       const credentials = loginFunc(form, fieldsMap);
//       localStorage.setItem("auth", 1);
//       console.log("LOGS", credentials);
//     }
//   });
// }
