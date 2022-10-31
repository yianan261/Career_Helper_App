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

  //function that checks if user is logged in before giving access to profile page and tracker page
  const checkUserInSession = async (page) => {
    let res;
    try {
      res = await fetch("./sign-in/getUserProfile");
      const currUser = await res.json();
      if (!currUser.isLoggedIn) {
        alert("Please sign in");
        window.location.replace("/sign-in");
      } else {
        page === "tracker"
          ? window.location.replace("/tracker")
          : window.location.replace("/profile");
      }
    } catch (err) {
      console.error(err);
    }
  };
}
Home();
