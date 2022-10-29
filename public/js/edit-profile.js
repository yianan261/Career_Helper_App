//Yian Chen
function EditProfile() {
  const profileData = {};
  // console.log("login.clientuser", Login.clientUser);

  //temporary data
  const mockUser = {
    email: "ychen151@nyit.edu",
    name: "Yian Chen",
    phone: "9165973444",
  };

  //function that changes placeholders of name,email,phone to user in session
  const showProfile = (data) => {
    const name = document.querySelector("[name='name']");
    const email = document.querySelector("[name='email']");
    const phone = document.querySelector("[name='phone']");
    name.value = `${data.name}`;
    email.value = `${data.email}`;
    phone.value = `${data.phone}`;
  };

  showProfile(mockUser);
  //check the login user in session
  // const userInSession = () => {};

  const renderProfile = (data) => {
    const test = document.querySelector("div.test");
    console.log("DATA", data);
    test.innerHTML = `
    <ul><li> ${data.careers} </li> <li> ${data.country} </li> </ul>
    `;
  };

  //function that updates profile when user fills out and submits profile form
  const updateProfile = () => {
    let res;
    const profileForm = document.getElementById("profileForm");
    if (profileForm) {
      profileForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        console.log("submitted profile form line 33 JS");
        update(profileForm);
      });
    }
    //update function
    const update = async (_form) => {
      try {
        res = await fetch("./profile/edit-profile", {
          method: "POST",
          body: new URLSearchParams(new FormData(_form)),
        });
        console.log("checking profile res line 21 JS", res.body);
        const profileRes = await res.json();
        console.log("checking edit profile JS line 23 ", profileRes);
        renderProfile(profileRes.data);
        alert(profileRes.message);
      } catch (err) {
        alert(`There is an error ${err}`);
        console.error(err);
      }
    };
  };

  //another function
  updateProfile();
}
EditProfile();
