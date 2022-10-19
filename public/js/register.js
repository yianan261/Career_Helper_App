//password verification

const val = {};
const pass = document.querySelector("#password");
const confirm = document.querySelector("#confirm");
const check = document.querySelector(".verify");

pass.addEventListener("input", (evt) => {
  password = "";
  password += evt.target.value;
  if (evt.target.value === "") {
    alert("Please enter a valid password");
  }

  val.password = password;
  return val.password;
});

let checker = false;
confirm.addEventListener("input", (evt) => {
  if (evt.target.value == val.password) {
    check.classList.add("verified");
    check.innerHTML = "match";
  } else {
    check.classList.add("verified");
    check.innerHTML = "passwords not matching";
  }
});
