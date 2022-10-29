//Yian Chen
//Login authentication module
function Login() {
  const clientUser = {};
  let currUser = null;

  const showMsg = (msg) => {
    alert(msg);
  };

  // //function that renders user profile when user is logged in
  // clientUser.renderProfile = (user_profile, _currUser) => {
  //   console.log(`RENDERS PROFILE of curr user ${user_profile} of ${_currUser}`);
  // };

  // //function that renders user tracker when user is logged in
  // const renderTracker = (user_tracker)=>{

  // }

  //function that gets db data and calls render profile when user is logged in
  // clientUser.getProfile = async () => {
  //   let res;
  //   try {
  //     res = await fetch("./getUserProfile");
  //     const profile = await res.json();
  //     clientUser.renderProfile(profile, currUser);
  //   } catch (err) {
  //     alert(`There is an error ${err}`);
  //     console.error(err);
  //   }
  // };
  const redirect = (page) => {
    window.location.replace(`/${page}`);
  };

  // //function that checks if user is logged in, in order to call getProfile and getTracker
  // clientUser.getCurrUser = async () => {
  //   let res;
  //   try {
  //     res = await fetch("./sign-in/getUser");
  //     const resUser = await res.json();
  //     if (resUser.isLoggedIn) {
  //       //if user is logged in render profile and tracker
  //       currUser = resUser.user;
  //       clientUser.getProfile();
  //       //getTracker() -> amanda implement
  //     }
  //     //else if not logged in, redirect to logged in
  //     else {
  //       currUser = null;
  //       redirect("sign-in");
  //     }
  //   } catch (err) {
  //     alert(`There is an error, ${err}`);
  //     console.error(err);
  //   }
  // };

  //function that listens to form and on submit authenticates user login
  clientUser.setupLogin = () => {
    console.log("setup login");
    const form = document.querySelector("form#stripe-login");
    let res;
    if (form) {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        console.log("authenticating");
        authenticate(form);
      });
    }

    //authenticate function
    const authenticate = async (_form) => {
      try {
        res = await fetch("./sign-in", {
          method: "POST",
          body: new URLSearchParams(new FormData(_form)),
        });
        console.log("res.body", res.body);
        const resUser = await res.json();
        console.log("RES", resUser);
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
      const logoutLink = document.getElementById("logout");
      // let res;
      if (logoutLink) {
        logoutLink.addEventListener("click", (evt) => {
          console.log("Logout event listener");
          evt.preventDefault();
          console.log("logout");
          logout();
        });
      }

      const logout = async () => {
        try {
          console.log("logging out");
          const res = await fetch("/sign-in/logout");
          const resLogout = await res.json();
          console.log("114");
          console.log("RESLOGOUT", resLogout.msg);
          showMsg(resLogout.msg);
          setTimeout(() => redirect("sign-in", 2000));
        } catch (err) {
          alert(`There is some error ${err}`);
          console.error(err);
        }
      };
    };
  };
  clientUser.setupLogin();
  clientUser.setupLogout();
  // clientUser.getCurrUser();
  // clientUser.getProfile();

  return clientUser;
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
