//Yian Chen
function EditProfile() {
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
    const user_email = document.getElementById("userEmail");

    _name.value = `${data.name}` || _name.placeholder;
    email.value = `${data.email}` || email.placeholder;
    phone.value = `${data.phone}` || phone.placeholder;
    data.stateWish
      ? (stateWish.value = `${data.stateWish}`)
      : (stateWish.value = "");
    data.careers ? (careers.value = `${data.careers}`) : (careers.value = "");
    data.education
      ? (education.value = `${data.education}`)
      : (education.value = "");
    data.skills ? (skills.value = `${data.skills}`) : (skills.value = "");
    data.toWorkOn
      ? (toWorkOn.value = `${data.toWorkOn}`)
      : (toWorkOn.value = "");
    data.country ? (country.value = `${data.country}`) : (country.value = "");
    data.state ? (state.value = `${data.state}`) : (state.value = "");
    data.experience
      ? (experience.value = `${data.experience}`)
      : (experience.value = "");

    user_name.innerHTML = `${data.name}`;
    user_email.innerHTML = `${data.email}`;
  };

  //check the login user in session
  const userInSession = async () => {
    try {
      const res = await fetch("./profile/user/edit-profile");
      const profileData = await res.json();
      if (profileData.data) {
        showProfile(profileData.data);
      }
    } catch (err) {
      alert(`There is an error ${err}`);
      console.error(err);
    }
  };

  //function that updates profile when user fills out and submits profile form
  const updateProfile = () => {
    let res;
    const profileForm = document.getElementById("profileForm");
    if (profileForm) {
      profileForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
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
        const profileRes = await res.json();
        alert(profileRes.message);
      } catch (err) {
        alert(`There is an error ${err}`);
      }
    };
  };

  updateProfile();
  userInSession();
}
EditProfile();
