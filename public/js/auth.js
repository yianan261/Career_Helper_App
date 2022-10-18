const isLoggedIn = document.querySelector("a.user-page");
const profile = document.getElementById("profile");

//checking if user is logged in
const validateAuth = (auth) => {
  if (auth !== 1 || auth == null) {
    window.location.replace("/sign-in");
  }
};
// profile.addEventListener("click", () => {
//   console.log("CLICKED");
// });

isLoggedIn.addEventListener("click", () => {
  console.log("CLICKED");
  const auth = localStorage.getItem("auth");
  validateAuth(auth);
});

// const auth = localStorage.getItem("auth");
// validateAuth(auth);

//If users logout, profile would be directed to home
const logOut = () => {
  localStorage.removeItem("auth");
  window.location.replace("/");
};
