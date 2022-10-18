//password verification

const val = {};
let pass = document.querySelector("#password");
let confirm = document.querySelector("#confirm");
const check = document.querySelector(".verify");

pass.addEventListener("input", (evt) => {
  password = "";
  password += evt.target.value;
  if (evt.target.value === "") {
    alert("Please input a valid password");
  }
  console.dir(evt);
  console.log(evt);
  val.password = password;
  console.log("password", val.password);
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
