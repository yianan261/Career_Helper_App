const validateAuth = () => {
  if (auth !== 1) {
    window.location.replace("/sign-in");
  }
};
const auth = localStorage.getItem("auth");
validateAuth(auth);

const logOut = () => {
  localStorage.removeItem("auth");
  window.location.replace("/");
};
