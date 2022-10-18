let navbar = document.querySelector("nav");
const button = document.querySelector("#login");

window.onscroll = function () {
  // pageYOffset or scrollY
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};

button.addEventListener("click", () => {
  location.href = "/sign-in";
});
