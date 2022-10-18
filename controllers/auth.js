// const path = require("path");

//If users try to click profile without logging in, it would direct them to login
// exports.validateAuth = (res, req) => {
//   if (typeof window !== "undefined") {
//     const validator = {};
//     const auth = localStorage.getItem("auth");
//     validator.auth = auth;
//     if (validator.auth !== 1) {
//       res.sendFile(path.join(__dirname, "../", "views", "sign-in.html")) ||
//         window.location.replace("/sign-in");
//     } else {
//       res.sendFile(path.join(__dirname, "../", "views", "profile.html"));
//     }
//   } else {
//     res.sendFile(path.join(__dirname, "../", "views", "404.html"));
//   }
// };

// const auth = localStorage.getItem("auth");
// validateAuth(auth);

//If users logout, profile would be directed to home
const logOut = () => {
  localStorage.removeItem("auth");
  window.location.replace("/");
};

// module.exports = { validateAuth, logOut };
