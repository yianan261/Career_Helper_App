const login = document.getElementById("login");
let logged = false;

login.addEventListener("click", () => {
  if (!logged) {
    logged = true;
  }
});
