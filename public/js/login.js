//Yian Chen
//Login authentication module
function Login() {
  const clientUser = {};
  //currUser is the user in session
  let currUser = null;
  clientUser.currUser = currUser;

  const showMsg = (msg) => {
    alert(msg);
  };

  const redirect = (page) => {
    window.location.replace(`/${page}`);
  };

  //function that listens to form and on submit authenticates user login
  clientUser.setupLogin = () => {
    console.log("setup login");
    const form = document.querySelector("form#stripe-login");
    let res;
    if (form) {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        console.log("authenticating");
        authenticate(form);
      });
    }

    //authenticate function
    const authenticate = async (_form) => {
      try {
        res = await fetch("./sign-in", {
          method: "POST",
          body: new URLSearchParams(new FormData(_form)),
        });
        console.log("res.body", res.body);
        const resUser = await res.json();
        console.log("RES", resUser);
        //if user is logged in, redirect to profile page
        if (resUser.isLoggedIn) {
          //this sets user in session
          clientUser.currUser = resUser.user;
          redirect("profile");
        } else {
          showMsg(resUser.err);
        }
      } catch (err) {
        alert(`There is an error, ${err}`);
        console.error(err);
      }
    };
  };
  //function that logs user out
  clientUser.setupLogout = () => {
    const logoutLink = document.getElementById("logout");
    // let res;
    if (logoutLink) {
      logoutLink.addEventListener("click", (evt) => {
        console.log("Logout event listener");
        evt.preventDefault();
        console.log("logout");
        logout();
      });
    }

    const logout = async () => {
      try {
        console.log("logging out");
        const res = await fetch("/sign-in/logout");
        const resLogout = await res.json();
        console.log("114");
        console.log("RESLOGOUT", resLogout.msg);
        showMsg(resLogout.msg);
        setTimeout(() => redirect("sign-in", 2000));
      } catch (err) {
        alert(`There is some error ${err}`);
        console.error(err);
      }
    };
  };
  clientUser.setupLogin();
  clientUser.setupLogout();
  // clientUser.getCurrUser();
  // clientUser.getProfile();

  return clientUser;
}

Login();
