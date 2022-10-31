// So Man Amanda Au-Yeung
function Index() {
  const index = {};

  const updatesDiv = document.querySelector("div#updates");
  let form = document.getElementById("tracker-form");

  function renderAdded(updates) {
    updatesDiv.innerHTML = "";
    console.log("render added", updates);
    for (let objects of updates["companies"]) {
      console.log("object, object id", objects, objects._id);
      let u = objects.tracker;
      let uDiv = document.createElement("div");
      let uEdit = document.createElement("button");
      uEdit.type = "button";
      uEdit.className = "editButton";
      const uDel = document.createElement("button");
      uDel.type = "submit";
      uDiv.className = "container-text-center";
      uDiv.innerHTML = `
      <form id=${objects._id}>
        <div class="row row-cols-6">
          <div class="col">
          <label><output>${u.company}</output></label>
          </div>
          <div class="col">
          <label><output>${u.position}</output></label>
          </div>
          <div class="col">
          <label><output>${u.appLink}</output></label>
          </div>
          <div class="col">
          <label><output>${u.openDate}</output></label>
          </div>
          <div class="col">
          <label><output>${u.status}</output></label>
          </div>
        </div>
        </form>
        `;
      uEdit.innerHTML = "Edit";
      uDel.innerHTML = "Delete";
      uDiv.appendChild(uEdit);
      uDiv.appendChild(uDel);
      updatesDiv.appendChild(uDiv);
      console.log("test render added u", u);
      uEdit.addEventListener("click", (evt) => {
        evt.preventDefault();
        console.log("edit tracker is clicked");
        editTracker(u, objects._id);
      });
    }
  }

  function getTracker() {
    if (form) {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        console.log("getTracker frontend form: ", form);
        createTracker(form);
        form = document.getElementById("tracker-form");
      });
    }
  }

  async function createTracker(form) {
    console.log("create tracker", form);
    try {
      await fetch("./tracker", {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
      });
      getAllTracker();
      let editButton = document.getElementsByClassName("editButton");
      editButton.addEventListener("click", (evt) => {
        console.log("edit button is clicked");
        evt.preventDefault();
      });
    } catch (err) {
      alert(`There is an error in createTracker ${err}`);
    }
  }

  async function getAllTracker() {
    console.log("get tracker");
    try {
      const res = await fetch("./tracker/get-tracker", {
        method: "GET",
      });
      const data = await res.json();
      console.log("data frontend get: ", data);
      renderAdded(data);
    } catch (err) {
      alert(`There is an error getAllTracker ${err}`);
    }
  }

  function editTracker(u, id) {
    console.log("123 edit tracker id, u", id, u);
    let tracker = document.querySelector("form#id");
    console.log("test tracker123 ", tracker);
    tracker.innerHTML = `
      <div class="row row-cols-6">
        <div class="col">
        <label><input placeholder=${u.company}></input></label>
        </div>
        <div class="col">
        <label><input placeholder=${u.position}></input></label>
        </div>
        <div class="col">
        <label><input placeholder=${u.appLink}></input></label>
        </div>
        <div class="col">
        <label><input placeholder=${u.openDate}></input></label>
        </div>
        <div class="col">
        <label><input placeholder=${u.status}></input></label>
        </div>
      </div>
      `;
    updateTracker();
  }

  // edit tracker and updates
  async function updateTracker() {
    try {
      await fetch("./tracker/updated-tracker", {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
      });
      getAllTracker();
    } catch (err) {
      alert(`There is an error updateTracker ${err}`);
    }
  }

  updateTracker();
  getAllTracker();
  getTracker();
  return index;
}

Index();
