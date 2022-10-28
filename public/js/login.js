//Yian Chen
//Login authentication module
function Login() {
  const clientUser = {};
  const divMsg = document.querySelector("div#msg");

  let currentUser = null;
  const showMsg = (msg) => {
    divMsg.querySelector("#msgContent").innerHTML = msg;
    divMsg.style.display = "block";
  };

  // //function that renders user profile when user is logged in
  // const renderProfile(user_profile){

  // }

  // //function that renders user tracker when user is logged in
  // const renderTracker(user_tracker){

  // }

  //function that gets db data and calls render profile when user is logged in
  const getProfile = async () => {
    let res;
    try {
      res = await fetch("./getUserProfile");
      const profile = await res.json();
      renderProfile(profile);
    } catch (err) {
      alert(`There is an error ${err}`);
      console.error(err);
    }
  };
  const redirect = (page) => {
    window.location.replace(`/${page}`);
  };

  //function that checks if user is logged in, in order to call getProfile and getTracker
  const getCurrUser = async () => {
    let res;
    try {
      res = await fetch("./getUser");
      const resUser = await res.json();
      if (resUser.isLoggedIn) {
        //if user is logged in render profile and tracker
        currUser = resUser.user;
        getProfile();
        //getTracker() -> amanda implement
      }
      //else if not logged in, redirect to logged in
      else {
        currUser = null;
        redirect("login");
      }
    } catch (err) {
      alert(`There is an error, ${err}`);
      console.error(err);
    }
  };

  //function that listens to form and on submit authenticates user login
  clientUser.setupLogin = () => {
    console.log("setup login");
    const form = document.querySelector("form#stripe-login");
    let res;
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log("authenticating");
      authenticate();
    });
    //authenticate function
    const authenticate = async () => {
      try {
        res = await fetch("./authenticate", {
          method: "POST",
          body: new URLSearchParams(new FormData(form)),
        });
        const resUser = await res.json();
        //if user is logged in, redirect to profile page
        if (resUser.isLoggedIn) {
          redirect("profile");
        } else {
          showMsg(resUser.err);
        }
      } catch (err) {
        alert(`There is an error, ${err}`);
        console.error(err);
      }
    };
    //function that logs user out
    clientUser.setupLogout = () => {
      const linkLoutout = document.querySelector("#linkLogout");
      let res;
      linkLogout.addEventListener("click", (evt) => {
        evt.preventDefault();
        console.log("logout");
        logout();
      });
      const logout = async () => {
        res = await fetch("/logout");
        const resLogout = await res.json();
        showMsg(resLogout.msg);
        setTimeout(() => redirect("/login", 2000));
      };
    };
  };
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
