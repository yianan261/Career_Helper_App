//Yian Chen
function Home() {
  const myProfile = document.getElementById("profile");
  const myTracker = document.getElementById("tracker");

  myTracker.addEventListener("click", (evt) => {
    evt.preventDefault();
    checkUserInSession("tracker");
  });
  myProfile.addEventListener("click", (evt) => {
    evt.preventDefault();
    checkUserInSession("profile");
  });
  const checkUserInSession = async (page) => {
    let res;
    try {
      res = await fetch("./sign-in/getUserProfile");
      const currUser = await res.json();
      console.log("currUser", currUser);
      if (!currUser.isLoggedIn) {
        alert("Please sign in");
        window.location.replace("/sign-in");
      } else {
        page === "tracker"
          ? window.location.replace("/tracker")
          : window.location.replace("/profile");

        console.log("res.data", res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
}
Home();
