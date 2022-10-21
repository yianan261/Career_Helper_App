const form = document.getElementById("stripe-login2");
const email = document.querySelector("[name='email']");
const password = document.querySelector("[name='password']");
const submitBtn = document.getElementById("submitBtn");

/**
 * createUser function gets the form information from registration that user fills out
 * @param {HTML element} form element
 * @param {Map} fieldsMap
 * @returns data object that contains name,email,password,phone
 */
const createUser = (form, fieldsMap) => {
  const data = {};
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  //set values for the fields keys
  for (const key of fieldsMap.keys()) {
    const input = document.querySelector(`[name='${key}']`);
    console.log("INPUT VALUE", input.value);
    fieldsMap.set(`${key}`, input.value);
  }
  console.log("fieldsmap", fieldsMap);
  data.name = fieldsMap.get("name");
  data.email = fieldsMap.get("email");
  data.password = fieldsMap.get("password");
  data.phone = fieldsMap.get("phone");

  return data;
};

/**
 * submit function that first checks if email value and password value are not empty
 * if not empty, gets the userData (data object) by calling createUser() function, then converts object for JSON
 */
const submit = async () => {
  const fieldsMap = new Map();
  fieldsMap.set("name", "");
  fieldsMap.set("email", "");
  fieldsMap.set("password", "");
  fieldsMap.set("phone", "");
  if (email.value.trim() == "" || password.value.trim() == "") {
    alert("Please enter correct email and password");
  } else {
    try {
      const userData = createUser(form, fieldsMap);
      console.log("USER DATA", userData);
      await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          response.json();
          console.log("response.body", response.body);
        })
        .then((data) => console.log(data));
    } catch (err) {
      console.error(err);
    }
  }
};
if (form) {
  submitBtn.addEventListener("click", submit);
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
