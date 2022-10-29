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

  // //function that renders user profile when user is logged in
  // clientUser.renderProfile = (user_profile, _currUser) => {
  //   console.log(`RENDERS PROFILE of curr user ${user_profile} of ${_currUser}`);
  // };

  // //function that renders user tracker when user is logged in
  // const renderTracker = (user_tracker)=>{

  // }

  // //function that checks if user is logged in, in order to call getProfile and getTracker
  // clientUser.getCurrUser = async () => {
  //   let res;
  //   try {
  //     res = await fetch("./sign-in/getUser");
  //     const resUser = await res.json();
  //     if (resUser.isLoggedIn) {
  //       //if user is logged in render profile and tracker
  //       currUser = resUser.user;
  //       clientUser.getProfile();
  //       //getTracker() -> amanda implement
  //     }
  //     //else if not logged in, redirect to logged in
  //     else {
  //       currUser = null;
  //       redirect("sign-in");
  //     }
  //   } catch (err) {
  //     alert(`There is an error, ${err}`);
  //     console.error(err);
  //   }
  // };

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

module.exports = Login;
