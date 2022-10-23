//Yian Chen
function Registration() {
  const form = document.getElementById("stripe-login2");
  const submitBtn = document.getElementById("submitBtn");
  const email = document.querySelector("[name='email']");

  const isRegistered = async (_email) => {
    try {
      console.log("check1");
      const user = await fetch("/register");
      console.log("check2");
      console.log("check User", user);
      const res = await user.json();
      console.log("check3 res", res);
      console.log("_email", _email);
      // if (_email === res.email) {
      //   console.log("it works!");
      //   alert("Email already registered!");
      // } else {
      //   alert("Registered Successfully!");
      // }
    } catch (err) {
      console.error(err);
    }
  };
  if (form) {
    submitBtn.addEventListener("click", () => {
      isRegistered(email);
      // alert("Registration successful!");
    });
  }

  //password verification for the registration page to check if passwords are matching
  const val = {};
  const pass = document.querySelector("#password");
  const confirm = document.querySelector("#confirm");
  const check = document.querySelector(".verify");

  pass.addEventListener("input", (evt) => {
    let password = "";
    password += evt.target.value;
    if (evt.target.value === "") {
      alert("Please enter a valid password");
    }

    val.password = password;
    return val.password;
  });

  confirm.addEventListener("input", (evt) => {
    if (evt.target.value == val.password) {
      check.classList.add("verified");
      check.innerHTML = "match";
    } else {
      check.classList.add("verified");
      check.innerHTML = "passwords not matching";
    }
  });
}

Registration();
