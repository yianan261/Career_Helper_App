function MyProfile() {
  //Yian Chen
  //renders profile
  const renderProfile = (data) => {
    const greetUser = document.getElementById("greetUser");
    greetUser.innerHTML = `Hello ${data.name}`;
  };

  //Yian Chen
  //check the login user in session
  const userInSession = async () => {
    try {
      const res = await fetch("./profile/user/edit-profile");
      const profileData = await res.json();
      if (profileData.data) {
        console.log("profileData.data", profileData.data);
        renderProfile(profileData.data);
      }
    } catch (err) {
      alert(`There is an error ${err}`);
      console.error(err);
    }
  };
  userInSession();
}
MyProfile();
