// const { response } = require("express");

//Yian Chen
function EditProfile() {
  // const profileData = {};
  // console.log("login.clientuser", Login.clientUser);

  //function that changes placeholders of name,email,phone to user in session
  const showProfile = (data) => {
    console.log("data", data);
    const _name = document.querySelector("[name='name']");
    const email = document.querySelector("[name='email']");
    const phone = document.querySelector("[name='phone']");
    const stateWish = document.querySelector("[name='stateWish']");
    const careers = document.querySelector("[name='careers']");
    const education = document.querySelector("[name='education']");
    const skills = document.querySelector("[name='skills']");
    const toWorkOn = document.querySelector("[name='toWorkOn']");
    const country = document.querySelector("[name='country']");
    const state = document.querySelector("[name='state']");
    const experience = document.querySelector("[name='experience']");
    const user_name = document.getElementById("userName");
    _name.value = `${data.name}`;
    email.value = `${data.email}`;
    phone.value = `${data.phone}`;
    stateWish.value = `${data.stateWish}`;
    careers.value = `${data.careers}`;
    education.value = `${data.education}`;
    skills.value = `${data.skills}`;
    toWorkOn.value = `${data.toWorkOn}`;
    country.value = `${data.country}`;
    state.value = `${data.state}`;
    experience.value = `${data.experience}`;
    user_name.innerHTML = `${data.name}`;
  };

  //check the login user in session
  const userInSession = async () => {
    try {
 
      const res = await fetch("./profile/user/edit-profile");
      const profileData = await res.json();
      // console.log(profileData.data.profile);
      showProfile(profileData.data.profile);
        
    } catch (err) {
      alert(`There is an error ${err}`);
      console.error(err);
    }
  };

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
  userInSession();
}
EditProfile();

