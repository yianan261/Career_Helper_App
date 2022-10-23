//Yian Chen

let navbar = document.querySelector("nav");
const button = document.querySelector("#login");

/**
 * scroll function that shows navbar on scroll
 */
window.onscroll = function () {
  // pageYOffset or scrollY
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};

// Event listener for the login button
button.addEventListener("click", () => {
  location.href = "/sign-in";
});
